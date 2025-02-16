/**
 * ESLint Configuration for the project
 *
 * "off" or 0 - turn the rule off
 * "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
 * "error" or 2 - turn the rule on as an error (exit code will be 1)
 */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'prettier', 'react-hooks'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    // General Rules
    'no-console': 'error', // Disallow console statements
    'no-param-reassign': 'error', // Disallow reassignment of function parameters
    'default-case': 'error', // Require a default case in switch statements
    'no-case-declarations': 'off', // Allow case declarations (can be useful for certain code patterns)
    'consistent-return': 'off', // Disable consistent return enforcement
    'no-return-assign': 'error', // Disallow return statements with assignments
    'no-extra-boolean-cast': 'error', // Prevent unnecessary boolean type casting
    'arrow-body-style': 'warn', // Enforce consistent arrow function body style
    'import/no-cycle': 'error', // Prevent import cycles
    'import/prefer-default-export': 'warn', // Warn about named exports in favor of default export if there's only one export

    // TypeScript Rules
    '@typescript-eslint/no-explicit-any': 'error', // Disallow the use of 'any' type
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error', // Disallow non-null assertion in optional chaining
    '@typescript-eslint/no-var-requires': 'error', // Disallow require statements
    '@typescript-eslint/consistent-type-imports': 'warn', // Enforce consistent type imports
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable the requirement to specify return types for functions in module boundaries
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ], // Prevent unused variables, ignore arguments/vars that start with '_'

    // React Rules
    'react/prop-types': 'error', // Enforce prop-types validation
    'react/no-array-index-key': 'error', // Avoid using array index as a key in lists
    'react/jsx-one-expression-per-line': 'off', // Allow multiple expressions per line in JSX
    'react/jsx-props-no-spreading': 'error', // Disallow props spreading in JSX
    'react/require-default-props': 'off', // Disable the requirement for defaultProps on every component
    'react/no-unused-prop-types': 'error', // Disallow unused prop types
    'react/no-unescaped-entities': 'error', // Prevent unescaped characters in JSX (like `'`)
    'react/destructuring-assignment': 'warn', // Warn when destructuring assignments are not used

    // React Hooks Rules
    'react-hooks/rules-of-hooks': 'error', // Enforce the rules of hooks
    'react-hooks/exhaustive-deps': 'error', // Enforce exhaustive dependency arrays in hooks

    // Prettier Integration
    'prettier/prettier': 'error', // Ensure code is formatted according to Prettier rules
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './packages/**/tsconfig.json', './demo/tsconfig.json'],
  },
  ignorePatterns: ['packages/icons/'], // Ignore specific patterns
  overrides: [
    {
      files: ['*.ts', '*.js', '**/index.tsx', '**/index.jsx'],
      rules: {
        'import/prefer-default-export': 'off', // Disable prefer-default-export rule for specific files
      },
    },
  ],
};
/**
 * ESLint Configuration for the project
 *
 * "off" or 0 - turn the rule off
 * "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
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
    // General Rules
    'no-console': 'error', // Disallow console statements
    'no-param-reassign': 'error', // Disallow reassignment of function parameters
    'default-case': 'error', // Require a default case in switch statements
    'no-case-declarations': 'off', // Allow case declarations (can be useful for certain code patterns)
    'consistent-return': 'off', // Disable consistent return enforcement
    'no-return-assign': 'error', // Disallow return statements with assignments
    'no-extra-boolean-cast': 'error', // Prevent unnecessary boolean type casting
    'arrow-body-style': 'warn', // Enforce consistent arrow function body style
    'import/no-cycle': 'error', // Prevent import cycles
    'import/prefer-default-export': 'warn', // Warn about named exports in favor of default export if there's only one export

    // TypeScript Rules
    '@typescript-eslint/no-explicit-any': 'error', // Disallow the use of 'any' type
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error', // Disallow non-null assertion in optional chaining
    '@typescript-eslint/no-var-requires': 'error', // Disallow require statements
    '@typescript-eslint/consistent-type-imports': 'warn', // Enforce consistent type imports
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable the requirement to specify return types for functions in module boundaries
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ], // Prevent unused variables, ignore arguments/vars that start with '_'

    // React Rules
    'react/prop-types': 'error', // Enforce prop-types validation
    'react/no-array-index-key': 'error', // Avoid using array index as a key in lists
    'react/jsx-one-expression-per-line': 'off', // Allow multiple expressions per line in JSX
    'react/jsx-props-no-spreading': 'error', // Disallow props spreading in JSX
    'react/require-default-props': 'off', // Disable the requirement for defaultProps on every component
    'react/no-unused-prop-types': 'error', // Disallow unused prop types
    'react/no-unescaped-entities': 'error', // Prevent unescaped characters in JSX (like `'`)
    'react/destructuring-assignment': 'warn', // Warn when destructuring assignments are not used

    // React Hooks Rules
    'react-hooks/rules-of-hooks': 'error', // Enforce the rules of hooks
    'react-hooks/exhaustive-deps': 'error', // Enforce exhaustive dependency arrays in hooks

    // Prettier Integration
    'prettier/prettier': 'error', // Ensure code is formatted according to Prettier rules
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    tsconfigRootDir: __dirname,
    project: ['./packages/**/tsconfig.json', './demo/tsconfig.json'],
  },
  ignorePatterns: ['packages/icons/', 'reports/**'], // Ignore specific patterns
  overrides: [
    {
      files: ['*.ts', '*.js', '**/index.tsx', '**/index.jsx'],
      rules: {
        'import/prefer-default-export': 'off', // Disable prefer-default-export rule for specific files
      },
    },
  ],
};
