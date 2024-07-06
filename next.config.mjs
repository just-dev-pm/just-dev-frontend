/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/projects/:id",
        destination: "/projects/:id/dashboard",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
