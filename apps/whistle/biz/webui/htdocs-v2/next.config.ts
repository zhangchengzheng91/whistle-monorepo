import type { NextConfig } from "next";

/** 启动 dev 时把 WHISTLE_CGI_ORIGIN 映射进 bundle，供 Middleware 读取（仅本地联调用） */
const whistleCgiOrigin =
  process.env.NEXT_PUBLIC_WHISTLE_CGI_ORIGIN ||
  process.env.WHISTLE_CGI_ORIGIN ||
  "";

/** Dev / `next start` 时代理到 Whistle，避免浏览器直连 8899 触发 CORS */
const whistleProxyTarget = (
  whistleCgiOrigin ? whistleCgiOrigin.replace(/\/$/, "") : "http://127.0.0.1:8899"
);

const nextConfig: NextConfig = {
  basePath: "/v2",
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_WHISTLE_CGI_ORIGIN: whistleCgiOrigin,
  },
  async rewrites() {
    return [
      {
        source: "/cgi-bin/:path*",
        destination: `${whistleProxyTarget}/cgi-bin/:path*`,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
