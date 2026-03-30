import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
