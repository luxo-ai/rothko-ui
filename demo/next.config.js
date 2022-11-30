/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@rothko-ui/ui', '@rothko-ui/icons']);

module.exports = {
  ...withTM(),
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
};
