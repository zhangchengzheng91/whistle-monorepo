import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * 开发时把 `/cgi-bin/*` 转发到本机 Whistle。
 *
 * Edge Middleware 里往往读不到 shell 里的 `WHISTLE_CGI_ORIGIN`，请用 `next.config` 注入的
 * `NEXT_PUBLIC_WHISTLE_CGI_ORIGIN`，或在 `.env.local` 里配置（见 next.config.ts 的 env）。
 */
function getWhistleOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_WHISTLE_CGI_ORIGIN ||
    process.env.WHISTLE_CGI_ORIGIN ||
    ""
  ).replace(/\/$/, "");
}

export async function middleware(request: NextRequest) {
  const origin = getWhistleOrigin();
  if (!origin) {
    return NextResponse.next();
  }

  const dest = new URL(
    request.nextUrl.pathname + request.nextUrl.search,
    origin,
  );

  const reqHeaders = new Headers(request.headers);
  reqHeaders.set("host", dest.host);

  const upstream = await fetch(dest, {
    method: request.method,
    headers: reqHeaders,
    cache: "no-store",
    ...(request.method !== "GET" && request.method !== "HEAD"
      ? { body: request.body, duplex: "half" as const }
      : {}),
  });

  const resHeaders = new Headers(upstream.headers);
  return new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: resHeaders,
  });
}

export const config = {
  matcher: "/cgi-bin/:path*",
};
