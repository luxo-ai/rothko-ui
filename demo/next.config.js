/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  '@rothko-ui/icons',
  '@rothko-ui/tokens',
  '@rothko-ui/ui',
]);

module.exports = {
  ...withTM(),
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    DEBUG: process.NEXT_PUBLIC_DEBUG,
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    VERSION: process.env.NEXT_PUBLIC_VERSION,
  },
  // otherwise .next
  distDir: 'build',
};
