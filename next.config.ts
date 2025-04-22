import type {NextConfig} from 'next';

const isProd = process.env.NODE_ENV === 'production';
const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  trailingSlash: true,
  assetPrefix: isProd ? '/flashtarjetas/' : '',
  basePath: isProd ? '/flashtarjetas' : '',
  output: 'export',
};

export default nextConfig;
