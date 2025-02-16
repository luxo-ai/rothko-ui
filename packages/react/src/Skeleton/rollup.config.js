import resolveNodeModules from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import externalPeerDependencies from 'rollup-plugin-peer-deps-external';
import { visualizer } from 'rollup-plugin-visualizer';

const isDev = process.env.NODE_ENV === 'dev';

export default {
  input: 'src/index.tsx',
  output: {
    dir: 'dist',
    entryFileNames: '[name].mjs',
    format: 'esm',
    sourcemap: isDev,
  },
  treeshake: {
    // Helps treeshake remove unused imports if:
    // 1) you declare that there are no side effects when loading a module
    moduleSideEffects: false,
    // 2) you declare that there are no side effects when reading a property
    propertyReadSideEffects: false,
  },
  plugins: [
    /* == Keep peer dependencies as external imports and not bundled == */
    externalPeerDependencies(),
    /* == Resolve modules from node_modules == */
    resolveNodeModules({
      // 1) if can't find the module in package.json, try with these extensions in this order
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      // 2) order of preference for package.json entry point fields
      mainFields: ['module', 'main'],
      // 3) prefer browser versions of modules (specified package.jsons)
      browser: true,
    }),
    /* == Convert CommonJS modules to ES6 == */
    commonjs({
      ignoreGlobal: true,
      include: /\/node_modules\//,
    }),
    typescript({
      tsconfig: './tsconfig.json',
      // Enable generation of declaration files
      declaration: true,
      outDir: 'dist',
    }),
    babel({
      exclude: /\/node_modules\//,
      // convert JSX syntax to React.createElement calls
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
    }),
    visualizer({
      open: false,
      filename: 'reports/bundle-analysis.html',
    }),
  ],
};
