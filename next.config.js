/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://janus-cj6m02ocv-ssabrut.vercel.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
