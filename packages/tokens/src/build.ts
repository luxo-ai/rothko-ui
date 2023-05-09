import fs from 'fs';
import type { Config as StyleConfig, Formatter } from 'style-dictionary';
import styledDictionary from 'style-dictionary';
import { pathToCssVariable } from './utils';

const VARIABLE_PREFIX = 'rothko';
const TEMP_DIR = 'tmp';
const OUT_DIR = 'build';

const generateThemeStyleDictionaryConfig = (theme: string): StyleConfig => ({
  source: [`tokens/themes/${theme}/*.json`],
  platforms: {
    web: {
      buildPath: `${OUT_DIR}/`,
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
      buildPath: `${OUT_DIR}/`,
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
    return `${pathToCssVariable(path, VARIABLE_PREFIX)}: ${properties.value};`;
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

const readContents = (directory: string, fileNames: string[]) => {
  const contents: string[] = [];

  for (const fileName of fileNames) {
    const path = `${directory}/${fileName}`;
    if (fs.existsSync(path)) {
      const fileContents = fs.readFileSync(path, 'utf8');
      contents.push(fileContents);
    }
  }

  return contents.join('\n');
};

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

  /*
  if (!fs.existsSync(OUT_DIR)) {
    console.log('Creating output dir');
    fs.mkdirSync(OUT_DIR);
  }

  console.log('Merging styles into one file');
  fs.writeFileSync(
    `${OUT_DIR}/index.css`,
    readContents(
      TEMP_DIR,
      ['light', 'dark'].map(theme => `${theme}.css`)
    )
  );
*/
  console.log('\n==============================================');
  console.log('\nBuild completed!');
};

void build();
