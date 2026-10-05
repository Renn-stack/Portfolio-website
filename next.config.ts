import type { NextConfig } from "next";

// STATIC_EXPORT=1 produces a self-contained static build in `out/` (no image optimizer).
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(staticExport ? { output: "export" as const } : {}),
  images: {
    unoptimized: staticExport,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1440, 1920, 2560],
  },
};

export default nextConfig;
