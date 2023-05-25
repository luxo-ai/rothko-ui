export default {
  baseUrl: process.env.BASE_URL || 'https://rothko-ui.com',
  debug: process.env.DEBUG === '1',
  preference: { themeMode: 'rothko-theme-mode' },
  contactEmail: 'luis@rothko-ui.com',
} as const;
