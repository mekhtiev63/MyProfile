import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  ...(process.env.SPACEWEB_ASSET_PREFIX
    ? { assetPrefix: "https://ruslanmekhtiev.vercel.app" }
    : {}),
};

export default nextConfig;
