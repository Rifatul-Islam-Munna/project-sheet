import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    cssChunking: true,
   
  },   
};

export default nextConfig;
