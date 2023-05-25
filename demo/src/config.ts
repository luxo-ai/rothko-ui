export default {
  baseUrl: process.env.BASE_URL || 'https://rothko-ui.com',
  repoUrl: 'https://github.com/luxo-ai/rothko-ui',
  debug: process.env.DEBUG === '1',
  preference: { themeMode: 'rothko-theme-mode' },
  contactEmail: 'luis@rothko-ui.com',
  ethWallet: '0x7A67fF6354d983B6cfc3a7f7C5BA93f73C864b32',
  version: process.env.VERSION || '1.0.0',
} as const;
