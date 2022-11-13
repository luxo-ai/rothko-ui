// ignore PascalCase requirements for exports from text.tsx
// const lowerCaseExports = new RegExp('^export const ([a-z][a-zA-Z0-9]*)\\s{0,1}=.*$', 'gm');
/*const textNames = require('fs')
  .readFileSync('./packages/ui/Text/Text.tsx')
  .toString()
  .match(lowerCaseExports)
  .map(s => s.replace(lowerCaseExports, '$1'));*/

/*
Our eslint config is relaxed because we implemented it late. 
We should tighten it up and enable more rules when there is time
*/
/*
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-native', '@typescript-eslint', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    // 'airbnb-typescript',
    //  'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-restricted-syntax': [0], // this rules requires us to use Array.forEach instead of (for ... of ) loops
    'global-require': [0], // we use require for images
    'no-continue': [0],
    'no-param-reassign': [0],
    'default-case': [0],
    'no-case-declarations': [0],
    'consistent-return': [0],
    'no-return-assign': [0],
    'arrow-body-style': [0], // a good rule but we break it everywhere
    'no-extra-boolean-cast': [0], // better safe than sorry
    // overrides for react
    'react/prop-types': [0],
    'react/no-array-index-key': [0],
    'react/jsx-one-expression-per-line': [0],
    'react/jsx-props-no-spreading': [0],
    //  'react/jsx-pascal-case': [2, { ignore: textNames }],

    'react/require-default-props': [0],
    'react/no-unused-prop-types': [0],
    'react/no-unescaped-entities': [0], // replace `'` with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;` etc.
    'react/destructuring-assignment': [0], // should be on but we pass props through in a few places
    // overrides for plugin:@typescript-eslint/recommended 
    '@typescript-eslint/no-explicit-any': [0],
    '@typescript-eslint/explicit-module-boundary-types': [0], // a pain to implement but useful
    '@typescript-eslint/no-non-null-assertion': [0],
    '@typescript-eslint/ban-types': [0], // pain to implement
    '@typescript-eslint/ban-ts-comment': [0], // a good rule but we break it :/
    '@typescript-eslint/explicit-function-return-type': [0],
    '@typescript-eslint/no-use-before-define': [0], // a good one but a pain for react native styles
    '@typescript-eslint/no-non-null-asserted-optional-chain': [0], // we unsafely break this a lot as well
    '@typescript-eslint/no-var-requires': [0], // duplicate of 'global-require'
    // weird import package 
    'import/no-cycle': [0],
    'import/prefer-default-export': [0],
    'import/no-extraneous-dependencies': [
      2,
      */
// { devDependencies: ['src/test/*.ts', 'src/test/*.tsx', '**/*.spec.ts', '**/*.spec.tsx'] },
/* ],
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
*/

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': [1],
    '@typescript-eslint/explicit-module-boundary-types': [0],
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./packages/**/tsconfig.json', './demo/tsconfig.json'],
  },
};
