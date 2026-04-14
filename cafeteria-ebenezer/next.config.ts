import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración de Turbopack para workspace raíz
  turbopack: {
    root: path.resolve("./"),
  },
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
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // Optimizaciones para Vercel
  experimental: {
    optimizePackageImports: ["react", "react-dom"],
  },
};

export default nextConfig;
