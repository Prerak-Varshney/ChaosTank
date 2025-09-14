import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    ENV: 'production',
    API_URL: process.env.ENV === 'development' ? 'http://localhost:3001/api/v1/water-level' : 'https://apichaostank.vercel.app/api/v1/',
  }
};

export default nextConfig;
