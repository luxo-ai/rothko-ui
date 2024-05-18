import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { babel } from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';
import autoprefixer from 'autoprefixer';
import crypto from 'crypto';

const isDev = process.env.NODE_ENV === 'dev';

export default [
  {
    input: './src/index.ts',
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
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        mainFields: ['module', 'main'],
      }),
      commonjs({
        ignoreGlobal: true,
        include: /\/node_modules\//,
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true, // Enable generation of declaration files
        declarationDir: '.', // Output directory for declaration files
        outDir: 'dist', // Required when declaration is true
        include: ['**/*.ts', '**/*.tsx', '**/*.d.ts', './declarations.d.ts'],
      }),
      postcss({
        plugins: [autoprefixer()],
        extract: true,
        modules: true,
        minimize: true,
        sourceMap: isDev,
        use: ['sass'],
        /* modules: {
          generateScopedName: (name, filename, css) => {
            const contentHash = crypto
              .createHash('md5')
              .update(filename)
              .update(css)
              .digest('hex')
              .slice(0, 10);
            const firstFewChars = name.slice(0, 3);
            return `${firstFewChars}_${contentHash}`;
          },
        },
        */
      }),
      babel({
        exclude: /\/node_modules\//,
        presets: [['@babel/preset-react', { useBuiltIns: true }]],
        babelHelpers: 'bundled',
      }),
      terser({
        output: {
          comments: false, // remove all comments
        },
      }),
      visualizer({
        open: false,
        filename: 'reports/bundle-analysis.html',
      }),
    ],
  },
];
