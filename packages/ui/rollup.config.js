import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import { visualizer } from 'rollup-plugin-visualizer';

const isDev = process.env.NODE_ENV === 'dev';

export default [
  {
    input: './src/index.ts', // Update this if your entry file is different
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: isDev,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: isDev,
      },
    ],
    treeshake: true,
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // add .js if it's not already included
        mainFields: ['module', 'main'], // look for 'module' entry point in package.json
      }),
      commonjs({
        ignoreGlobal: true,
        include: /\/node_modules\//,
      }),
      // ensure TypeScript compiles your JSX/TSX
      typescript({
        tsconfig: './tsconfig.json', // Path to a specific tsconfig file
        declaration: true, // Enable generation of declaration files
        declarationDir: '.', // Output directory for declaration files
        outDir: 'dist', // Required when declaration is true
      }),
      postcss({
        extract: false, // Inline CSS in the JavaScript, set true if you prefer CSS files
        modules: true,
        use: ['sass'],
      }),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
        plugins: ['babel-plugin-styled-components'],
      }),
      terser({
        output: {
          comments: false, // This will remove all comments
        },
      }),
      visualizer({
        open: true, // Automatically open the report in your browser
        filename: 'reports/bundle-analysis.html', // Output to a separate 'reports' directory
      }),
    ],
  },
];
