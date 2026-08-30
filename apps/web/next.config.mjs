/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@zustag/domain-core', '@zustag/inventory-engine', '@zustag/eta-engine'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
