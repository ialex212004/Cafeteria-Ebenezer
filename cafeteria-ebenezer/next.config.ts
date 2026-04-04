import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.freepik.es",
      },
      {
        protocol: "https",
        hostname: "www.pexels.com",
      },
    ],
  },
  // Optimizaciones para Vercel
  experimental: {
    optimizePackageImports: ["react", "react-dom"],
  },
};

export default nextConfig;
