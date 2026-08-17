import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  // Allow preview tunnels (Cloudflare, localtunnel, ngrok) to load dev chunks.
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "*.loca.lt",
    "*.ngrok-free.app",
    "*.ngrok.io",
  ],
  ...(process.env.SPACEWEB_ASSET_PREFIX
    ? { assetPrefix: "https://ruslanmekhtiev.vercel.app" }
    : {}),
};

export default nextConfig;
