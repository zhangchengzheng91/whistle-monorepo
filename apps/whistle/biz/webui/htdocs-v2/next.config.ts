import type { NextConfig } from "next";

/**
 * 与 Whistle 联调时的后端 origin（rewrite 目标 / 打进 bundle 的公共变量）
 */
const whistleCgiOrigin =
  process.env.NEXT_PUBLIC_WHISTLE_CGI_ORIGIN ||
  process.env.WHISTLE_CGI_ORIGIN ||
  "";

/** `next dev` / `next start` 时把 /cgi-bin 转到本机 Whistle（静态导出构建不包含服务端，无 rewrite） */
const whistleProxyTarget = (
  whistleCgiOrigin ? whistleCgiOrigin.replace(/\/$/, "") : "http://127.0.0.1:8899"
);

/** 仅在打静态包给 Whistle 的 `pnpm build` 中开启，与 Middleware 互斥，且 dev 不能设为 export */
const staticExport = process.env.WHISTLE_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  basePath: "/v2",
  ...(staticExport ? { output: "export" as const } : {}),
  transpilePackages: [
    "antd",
    "@ant-design/icons",
    "@ant-design/nextjs-registry",
    "@ant-design/cssinjs",
  ],
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
