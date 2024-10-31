import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.moralis.io", // erc20 tokens logos
      },

      {
        protocol: "https",
        hostname: "cdn.moralis.io", // erc20 tokens logos
      },
    ],
  },
};

export default nextConfig;
