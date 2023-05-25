/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@rothko-ui/ui', '@rothko-ui/icons']);

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
  },
};
