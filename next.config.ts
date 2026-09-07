import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/my-portfolio",

  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

export default nextConfig;
