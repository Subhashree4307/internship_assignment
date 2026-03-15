import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows hot-reload requests from other devices on the local network when running `next dev`
  // (prevents the "allowedDevOrigins" warning in newer Next.js versions).
  experimental: {
    allowedDevOrigins: ["http://192.168.1.6:3000", "http://192.168.1.6:3001"],
  },
};

export default nextConfig;
