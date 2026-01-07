import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  webpack: (config, { isServer }) => {
    // Resolve framer-motion to a single version
    config.resolve.alias = {
      ...config.resolve.alias,
      "framer-motion": require.resolve("framer-motion"),
      "motion-dom": require.resolve("motion-dom"),
    };
    
    return config;
  },
};

export default nextConfig;
