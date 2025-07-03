import type { NextConfig } from "next";

// remotePatterns: [new URL("https://cdn.shopify.com/s/files/**")],
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.shopify.com",
            },
        ],
    },
};

export default nextConfig;
