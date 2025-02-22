const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  env: {
    ROTHKO_DEBUG: process.env.ROTHKO_DEBUG,
    BASE_URL: process.env.BASE_URL,
    VERSION: process.env.VERSION,
  },
  transpilePackages: ['@rothko-ui/icons', '@rothko-ui/tokens', '@rothko-ui/react'],
  // otherwise .next
  distDir: 'build',
};

export default nextConfig;
