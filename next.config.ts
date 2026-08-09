import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow preview tunnels (Cloudflare, localtunnel, ngrok) to load dev chunks.
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "*.loca.lt",
    "*.ngrok-free.app",
    "*.ngrok.io",
  ],
};

export default nextConfig;
