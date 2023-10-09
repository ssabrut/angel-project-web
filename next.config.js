/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://janus-api-ssabrut.vercel.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
