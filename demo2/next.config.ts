import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    ROTHKO_DEBUG: process.env.ROTHKO_DEBUG,
    BASE_URL: process.env.BASE_URL,
    VERSION: process.env.VERSION,
  },
  transpilePackages: [
    '@rothko-ui/icons',
    '@rothko-ui/tokens',
    '@rothko-ui/react',
    '@rothko-ui/button',
    '@rothko-ui/typography',
  ],
  // use default .next for build directory.
  // the latest tailwindcss version causes infinite
  // hot reload when using a custom build directory
  // distDir: 'build',
  redirects: async () => {
    return [
      {
        source: '/components',
        destination: '/components/accordion',
        permanent: false,
      },
      {
        source: '/docs',
        destination: '/overview',
        permanent: false,
      },
      {
        source: '/',
        destination: '/overview',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
