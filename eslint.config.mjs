import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint-define-config';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import path from 'path';

const rootDir = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: [
      'packages/icons/**/*',
      '**/reports/**/*',
      '**/dist/**/*',
      '**/build/**/*',
      '*.html',
      '*.txt',
      '*.sh',
      '*.md',
      '*.json',
      '*.png',
      '*.js',
      '**/*.js',
      '**/*.jsx',
      'postcss.config.mjs',
      'eslint.config.mjs',
      '.eslintrc.js',
      'next-env.d.ts',
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        tsconfigRootDir: rootDir,
        project: ['./tsconfig.json', './packages/**/tsconfig.json', './demo/tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      react: reactPlugin,
      prettier: prettierPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      // General Rules
      'no-console': 'error',
      'no-param-reassign': 'error',
      'default-case': 'error',
      'no-case-declarations': 'off',
      'consistent-return': 'off',
      'no-return-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'arrow-body-style': 'off',
      'import/no-cycle': 'error',
      'import/prefer-default-export': 'off',

      // TypeScript Rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // React Rules
      'react/prop-types': 'error',
      'react/no-array-index-key': 'error',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-props-no-spreading': 'error',
      'react/require-default-props': 'off',
      'react/no-unused-prop-types': 'error',
      'react/no-unescaped-entities': 'error',
      'react/destructuring-assignment': 'off',

      // React Hooks Rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',

      // Prettier Integration
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/demo/**/*'],
    rules: {
      // next.js
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
]);
