import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';
import autoprefixer from 'autoprefixer';

const isDev = process.env.NODE_ENV === 'dev';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        entryFileNames: '[name].mjs',
        chunkFileNames: 'chunk-[hash].mjs',
        format: 'esm',
        sourcemap: false, // isDev,
      },
    ],
    treeshake: true,
    plugins: [
      // similar to "external" keyword in output
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
        // Enable generation of declaration files
        declaration: true,
        // Output directory for declaration files
        declarationDir: 'dist',
        outDir: 'dist',
        include: ['**/*.ts', '**/*.tsx', '**/*.d.ts', './declarations.d.ts'],
      }),
      postcss({
        plugins: [autoprefixer()],
        extract: false, // true,
        modules: true,
        minimize: true,
        sourceMap: isDev,
        use: ['sass'],
      }),
      babel({
        exclude: /\/node_modules\//,
        // convert JSX syntax to React.createElement calls
        presets: ['@babel/preset-react'],
        // mark helpers meant to transpile modern ECMAScript features as 'external'
        babelHelpers: 'bundled',
      }),
      visualizer({
        open: false,
        filename: 'reports/bundle-analysis.html',
      }),
    ],
  },
];
