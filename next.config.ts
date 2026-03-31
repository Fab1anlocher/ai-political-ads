import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/api/generate': ['./argumentarien/**'],
  },
};

export default nextConfig;
