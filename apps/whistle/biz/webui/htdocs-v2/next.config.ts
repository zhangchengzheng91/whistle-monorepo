import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/v2",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
