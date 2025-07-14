/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.grubify.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'https://cdn.grubify.co.uk',
      },
    ],
  },
};

export default nextConfig;
