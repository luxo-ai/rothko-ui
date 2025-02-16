/**
 * "off" or 0 - turn the rule off
 * "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
 * "error" or 2 - turn the rule on as an error (exit code will be 1)
 */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'prettier', 'react-hooks', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    /*
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index', 'object', 'type'],
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    */
    'no-console': ['error'],
    'no-param-reassign': ['error'],
    'default-case': ['error'],
    'no-case-declarations': ['off'],
    'consistent-return': ['off'],
    'no-return-assign': ['error'],
    'arrow-body-style': ['warn'],
    'no-extra-boolean-cast': ['error'],
    'arrow-body-style': ['off'],
    // eslint-plugin-import
    'import/no-cycle': ['error'],
    'import/prefer-default-export': ['warn'],
    // plugin:@typescript-eslint/recommended
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
    '@typescript-eslint/no-var-requires': ['error'],
    '@typescript-eslint/consistent-type-imports': ['warn'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    // eslint-plugin-react
    'react/prop-types': ['error'],
    'react/no-array-index-key': ['error'],
    'react/jsx-one-expression-per-line': ['off'],
    'react/jsx-props-no-spreading': ['error'],
    // 'react/jsx-pascal-case': ['error', { ignore: textNames }],
    'react/require-default-props': ['off'],
    'react/no-unused-prop-types': ['error'],
    'react/no-unescaped-entities': ['error'], // replace `'` with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;` etc.
    'react/destructuring-assignment': ['warn'],
    // eslint-plugin-react-hooks
    'react-hooks/rules-of-hooks': ['error'],
    'react-hooks/exhaustive-deps': ['error'],
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './packages/**/tsconfig.json', './demo/tsconfig.json'],
  },
  ignorePatterns: ['packages/icons/'],
  overrides: [
    {
      files: ['*.ts', '*.js', '**/index.tsx', '**/index.jsx'],
      rules: {
        'import/prefer-default-export': ['off'],
      },
    },
  ],
};
