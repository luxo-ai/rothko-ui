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
  env: {
    DEBUG: process.env.DEBUG,
    BASE_URL: process.env.BASE_URL,
    VERSION: process.env.VERSION,
  },
  // otherwise .next
  distDir: 'build',
};
