import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for shared hosting (SuperHosting / Apache).
  output: "export",
  // No server-side image optimization on static hosting.
  images: { unoptimized: true },
  // Emit /bg/ai/index.html so Apache serves clean URLs from folders.
  trailingSlash: true,
};

export default nextConfig;
