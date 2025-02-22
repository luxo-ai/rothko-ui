import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { babel } from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { visualizer } from 'rollup-plugin-visualizer';

const isDev = process.env.NODE_ENV === 'dev';

export default {
  input: {
    index: 'src/index.ts',
    components: 'src/components/index.ts',
    dom: 'src/dom/index.ts',
    hooks: 'src/hooks/index.ts',
    utils: 'src/utils/index.ts',
    layout: 'src/layout/index.ts',
  },
  output: {
    dir: 'dist',
    entryFileNames: '[name].mjs',
    chunkFileNames: 'chunk-[hash].mjs',
    format: 'esm',
    sourcemap: isDev,
  },
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
  },
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      mainFields: ['module', 'main'],
    }),
    commonjs({
      ignoreGlobal: true,
      include: /\/node_modules\//,
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      outDir: 'dist',
      include: ['**/*.ts', '**/*.tsx', '**/*.d.ts', './declarations.d.ts'],
    }),
    babel({
      exclude: /\/node_modules\//,
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
    }),
    /*
      terser({
        output: {
          comments: false, // remove all comments
        },
      }),*/
    visualizer({
      open: false,
      filename: 'reports/bundle-analysis.html',
    }),
  ],
};
