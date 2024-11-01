import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;
