/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["msquarefdc.sgp1.digitaloceanspaces.com", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
