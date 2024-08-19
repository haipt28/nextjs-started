/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    console.log("Backend domain: ", process.env.NEXT_PUBLIC_BACKEND_DOMAIN);
    return [
      {
        source: "/service/:path*",
        destination: process.env.NEXT_PUBLIC_BACKEND_DOMAIN + "/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
