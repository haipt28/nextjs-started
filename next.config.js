/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    console.log("Backend domain: ", process.env.NEXT_PUBLIC_BACKEND_DOMAIN);
    console.log("Keycloak domain: ", process.env.KEYCLOAK_BASE_URL);
    return [
      {
        source: "/service/:path*",
        destination: process.env.NEXT_PUBLIC_BACKEND_DOMAIN + "/:path*",
      },
      {
        source: "/keycloak/:path*",
        destination: process.env.KEYCLOAK_BASE_URL + "/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
