const styledDictionary = require('style-dictionary');
const compact = require('lodash/compact');
const fs = require('fs');
const path = require('path');

const CSS_OUT_DIRECTORY = 'build';
const COMBINED_CSS_FILE_NAME = 'tokens.css';

const generateThemeCssStyleDictionaryConfig = theme => ({
  source: [`tokens/theme/${theme}/*.json`],
  platforms: {
    web: {
      buildPath: `${CSS_OUT_DIRECTORY}/`,
      // css transform group generates a kebab case token name
      transformGroup: 'css',
      files: [
        {
          destination: `${theme}-variables.css`,
          format: 'css/variables-themed',
          options: { className: theme, isDefault: theme === 'light' },
        },
      ],
    },
  },
});

const generateLayoutStyleDictionaryConfig = () => ({
  source: ['tokens/layout.json'],
  platforms: {
    web: {
      buildPath: `${CSS_OUT_DIRECTORY}/`,
      // css transform group generates a kebab case token name
      transformGroup: 'css',
      files: [
        {
          destination: 'layout-variables.css',
          format: 'css/variables',
        },
      ],
    },
  },
});

const generateComponentStyleDictionaryConfig = () => ({
  source: ['tokens/component.json'],
  platforms: {
    web: {
      buildPath: `${CSS_OUT_DIRECTORY}/`,
      // css transform group generates a kebab case token name
      transformGroup: 'css',
      files: [
        {
          destination: 'component-variables.css',
          format: 'css/variables',
        },
      ],
    },
  },
});

const removeDefaultSuffix = name => {
  return name.replace(/[-_]+default$/i, '');
};

const createSpaces = numSpaces => {
  return ' '.repeat(numSpaces);
};

const rothkoCssRootFormatter = ({ dictionary, options, file }) => {
  const header = styledDictionary.formatHelpers.fileHeader({ file });

  const classNameOpt = options.className;
  const includeRoot = Boolean(options.isDefault || !classNameOpt);

  const cssVariables = dictionary.allProperties.map(token => {
    return `--rothko-${removeDefaultSuffix(token.name)}: ${token.value};`;
  });

  const classNames = compact([
    includeRoot && ':root',
    classNameOpt && `:root .${classNameOpt}`,
  ]).join(', ');

  const styleContent = `${createSpaces(2)}${cssVariables.join(`\n${createSpaces(2)}`)}`;
  return `${header}${classNames} {\n${styleContent}\n}`;
};

styledDictionary.registerFormat({
  name: 'css/variables-themed',
  formatter: function (args) {
    const themedVariablesFormat = rothkoCssRootFormatter(args);

    const classNameOpt = args.options.className;
    const includeRoot = Boolean(args.options.isDefault || !classNameOpt);

    const fill = 'fill: var(--rothko-icon-background, #000)';

    const classNames = compact([
      includeRoot && ':root',
      classNameOpt && `:root .${classNameOpt}`,
    ]).join(', ');

    return `${themedVariablesFormat}\n\n${classNames} {\n  ${fill}\n}`;
  },
});

styledDictionary.registerFormat({
  name: 'css/variables',
  formatter: rothkoCssRootFormatter,
});

const build = () => {
  const generatedFiles = [];

  ['light', 'dark'].map(theme => {
    console.log('\n==============================================');
    console.log(`\nCreating theme - ${theme}`);
    styledDictionary.extend(generateThemeCssStyleDictionaryConfig(theme)).buildPlatform('web');
    generatedFiles.push(path.join(CSS_OUT_DIRECTORY, `${theme}-variables.css`));
    console.log(`\nFinish theme - ${theme}`);
  });

  console.log('\n==============================================');
  console.log(`\nCreating typography`);
  styledDictionary.extend(generateLayoutStyleDictionaryConfig()).buildPlatform('web');
  generatedFiles.push(path.join(CSS_OUT_DIRECTORY, 'layout-variables.css'));

  console.log('\n==============================================');
  console.log(`\nCreating components`);
  styledDictionary.extend(generateComponentStyleDictionaryConfig()).buildPlatform('web');
  generatedFiles.push(path.join(CSS_OUT_DIRECTORY, 'component-variables.css'));

  console.log('\n==============================================');
  console.log('\nToken generation completed!');

  console.log('\n==============================================');
  console.log('\nPushing directives');
  generatedFiles.push('./src/directive.css');

  console.log('\n==============================================');
  console.log('\nCreating combined CSS file');
  const combinedCss = generatedFiles.map(file => fs.readFileSync(file)).join('\n\n');
  fs.writeFileSync(path.join(CSS_OUT_DIRECTORY, COMBINED_CSS_FILE_NAME), combinedCss);

  process.exit(0);
};

void build();
