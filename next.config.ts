import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    ENV: 'development',
    API_URL: process.env.ENV === 'development' ? 'http://localhost:3001/api/v1' : 'https://apichaostank.vercel.app/api/v1',
  }
};

export default nextConfig;
