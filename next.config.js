/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "avatars.githubusercontent.com"],
  },
  // Enable SWC minification
  swcMinify: true,
};

module.exports = nextConfig;
