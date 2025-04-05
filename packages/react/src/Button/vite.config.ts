import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import preserveDirectives from 'rollup-preserve-directives';
import { fileURLToPath } from 'url';
import { defineConfig, type Plugin } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: isDev,
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      formats: ['es'],
      fileName: () => '[name].mjs',
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Keep peer dependencies external
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
    },
  },
  plugins: [
    /* == Handles React JSX, Fast Refresh == */
    isDev && react(),

    /* == Use TS paths from tsconfig.json == */
    tsconfigPaths(),

    /* == Generate TypeScript declaration files == */
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
    }),

    preserveDirectives() as Plugin,
  ].filter(Boolean),
});
