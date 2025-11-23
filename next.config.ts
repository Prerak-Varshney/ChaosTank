import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        const apiUrl = process.env.API_URL || "http://localhost:3001";
        console.log(`Rewriting /api/v1 to ${apiUrl}`);
        return [
            {
                source: "/api/v1/:path*",
                destination: `${apiUrl}/api/v1/:path*`,
            },
        ];
    },
};

export default nextConfig;
