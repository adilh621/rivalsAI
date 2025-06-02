/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TRACKER_API_KEY: process.env.TRACKER_API_KEY,
  },
  images: {
    domains: ['trackercdn.com'],
  }
};

export default nextConfig;
