/* eslint-disable no-console */
import type { Formatter, Config as StyleConfig } from 'style-dictionary';
import styledDictionary from 'style-dictionary';
import { pathToCssVariable } from './utils.js';

const OUT_DIRECTORY = 'build';

const generateThemeStyleDictionaryConfig = (theme: string): StyleConfig => ({
  source: [`tokens/themes/${theme}/*.json`],
  platforms: {
    web: {
      buildPath: `${OUT_DIRECTORY}/`,
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

const generatePlatformStyleDictionaryConfig = (): StyleConfig => ({
  source: [`tokens/platforms/**/*.json`],
  platforms: {
    web: {
      buildPath: `${OUT_DIRECTORY}/`,
      files: [
        {
          destination: 'global-variables.css',
          format: 'css/variables',
        },
      ],
    },
  },
});

const rothkoCssRootFormatter: Formatter = ({ dictionary, options, file }) => {
  const header = styledDictionary.formatHelpers.fileHeader({ file });
  const { className } = options;

  const cssVariables = dictionary.allProperties.map(properties => {
    const [, ...path] = properties.path;
    return `${pathToCssVariable(path)}: ${properties.value};`;
  });

  const styleClassName = className ? `:root .${className}` : ':root';
  const styleContent = `  ${[...cssVariables].join('\n  ')}`;

  return `${header}${styleClassName} {\n${styleContent}\n}`;
};

styledDictionary.registerFormat({
  name: 'css/variables-themed',
  formatter: function (args) {
    const themedVariablesFormat = rothkoCssRootFormatter(args);
    const fill = 'fill: var(--rothko-svg-fill, #000)';
    const className = args.options.className ? `:root .${args.options.className}` : ':root';
    return `${themedVariablesFormat}\n\n${className} {\n  ${fill}\n}`;
  },
});

styledDictionary.registerFormat({
  name: 'css/variables',
  formatter: rothkoCssRootFormatter,
});

const build = async () => {
  ['light', 'dark'].map(theme => {
    console.log('\n==============================================');
    console.log(`\nCreating theme - ${theme}`);
    styledDictionary.extend(generateThemeStyleDictionaryConfig(theme)).buildPlatform('web');
    console.log(`\nFinish theme - ${theme}`);
  });

  console.log('\n==============================================');
  console.log(`\nCreating typography`);
  styledDictionary.extend(generatePlatformStyleDictionaryConfig()).buildPlatform('web');

  console.log('\n==============================================');
  console.log('\nBuild completed!');
};

void build();
