/* eslint-disable no-console */
// import type { Formatter, Config as StyleConfig } from 'style-dictionary';
const styledDictionary = require('style-dictionary');
const { compact, toScreamingSnakeCase } = require('@rothko-ui/utils');
const prettier = require('prettier');

const CSS_OUT_DIRECTORY = 'build';
const TS_OUT_DIRECTORY = 'src/tokens';

const generateThemeCssStyleDictionaryConfig = theme => ({
  source: [`tokens/themes/${theme}/*.json`],
  platforms: {
    web: {
      buildPath: `${CSS_OUT_DIRECTORY}/`,
      // css transform group generates a kebab case token name
      transformGroup: 'css',
      files: [
        {
          destination: `${theme}-variables.css`,
          format: 'css/variables-themed',
          options: { className: theme },
        },
      ],
    },
  },
});

const generateThemeTypescriptStyleDictionaryConfig = theme => ({
  source: [`tokens/themes/${theme}/*.json`],
  platforms: {
    web: {
      buildPath: `${TS_OUT_DIRECTORY}/`,
      files: [
        {
          destination: `${theme}.ts`,
          format: 'ts/module-themed',
        },
      ],
    },
  },
});

const generatePlatformStyleDictionaryConfig = () => ({
  source: [`tokens/platforms/**/*.json`],
  platforms: {
    web: {
      buildPath: `${CSS_OUT_DIRECTORY}/`,
      // css transform group generates a kebab case token name
      transformGroup: 'css',
      files: [
        {
          destination: 'global-variables.css',
          format: 'css/variables',
        },
      ],
    },
  },
});

const generatePlatformTypescriptStyleDictionaryConfig = () => ({
  source: [`tokens/platforms/**/*.json`],
  platforms: {
    web: {
      buildPath: `${TS_OUT_DIRECTORY}/`,
      files: [
        {
          destination: 'layout.ts',
          format: 'ts/module',
        },
      ],
    },
  },
});

const doesNotRequireQuotes = value => {
  return value === null || typeof value === 'number' || typeof value === 'boolean';
};

const removeDefaultSuffix = name => {
  return name.replace(/[-_]+default$/i, '');
};

const createSpaces = numSpaces => {
  return ' '.repeat(numSpaces);
};

const rothkoCssRootFormatter = ({ dictionary, options, file }) => {
  const header = styledDictionary.formatHelpers.fileHeader({ file });
  const { className } = options;

  const cssVariables = dictionary.allProperties.map(token => {
    return `--rothko-${removeDefaultSuffix(token.name)}: ${token.value};`;
  });

  const styleClassName = compact([':root', className && `.${className}`]).join(' ');
  const styleContent = `${createSpaces(2)}${cssVariables.join(`\n${createSpaces(2)}`)}`;

  return `${header}${styleClassName} {\n${styleContent}\n}`;
};

const rothkoTsFormatter = ({ dictionary, file }) => {
  const header = styledDictionary.formatHelpers.fileHeader({ file });

  const tsConstants = dictionary.allProperties.map(({ path, value }) => {
    const constantName = path.map(toScreamingSnakeCase).join('_');
    const constantValue = doesNotRequireQuotes(value) ? value : JSON.stringify(value);
    return `export const ${removeDefaultSuffix(constantName)} = ${constantValue};`;
  });

  const code = `${header}\n${tsConstants.join('\n')}`;
  return prettier.format(code, { singleQuote: true });
};

styledDictionary.registerFormat({
  name: 'css/variables-themed',
  formatter: function (args) {
    const themedVariablesFormat = rothkoCssRootFormatter(args);
    const fill = 'fill: var(--rothko-icon-background, #000)';
    const className = args.options.className ? `:root .${args.options.className}` : ':root';
    return `${themedVariablesFormat}\n\n${className} {\n  ${fill}\n}`;
  },
});

styledDictionary.registerFormat({
  name: 'css/variables',
  formatter: rothkoCssRootFormatter,
});

styledDictionary.registerFormat({
  name: 'ts/module-themed',
  formatter: rothkoTsFormatter,
});

styledDictionary.registerFormat({
  name: 'ts/module',
  formatter: rothkoTsFormatter,
});

const build = () => {
  ['light', 'dark'].map(theme => {
    console.log('\n==============================================');
    console.log(`\nCreating theme - ${theme}`);
    styledDictionary.extend(generateThemeCssStyleDictionaryConfig(theme)).buildPlatform('web');
    // .extend(generateThemeTypescriptStyleDictionaryConfig(theme))
    // .buildPlatform('web');
    console.log(`\nFinish theme - ${theme}`);
  });

  console.log('\n==============================================');
  console.log(`\nCreating typography`);
  styledDictionary.extend(generatePlatformStyleDictionaryConfig()).buildPlatform('web');
  // .extend(generatePlatformTypescriptStyleDictionaryConfig())
  // .buildPlatform('web');

  console.log('\n==============================================');
  console.log('\nToken generation completed!');

  process.exit(0);
};

void build();
