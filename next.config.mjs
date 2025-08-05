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
        hostname: 'api.ramtd.net',
      },
    ],
  },
};

export default nextConfig;
