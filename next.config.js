/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  basePath: "/Personal-Website", // Change to your GitHub repo name
  assetPrefix: "/Personal-Website/", // Required for static assets
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
