/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/nextjs',
  assetPrefix: '/nextjs',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
