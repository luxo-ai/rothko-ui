import fs from 'fs';
import type { Config as StyleConfig } from 'style-dictionary';
import styledDictionary from 'style-dictionary';
import { pathToCssVariable } from './utils';

const TEMP_DIR = 'tmp';
const OUT_DIR = 'build';
const THEMES = ['dark', 'light'] as const;

type GenerateStyledDictionaryConfigArgs = {
  theme: string;
  dir: string;
};
const generateStyleDictionaryConfig = ({
  theme,
  dir,
}: GenerateStyledDictionaryConfigArgs): StyleConfig => ({
  source: ['tokens/themes/light/**/*.json'],
  platforms: {
    web: {
      buildPath: `${dir}/`,
      files: [
        {
          destination: `${theme}.css`,
          format: 'css/variables-themed',
          options: { theme },
        },
      ],
    },
  },
});

styledDictionary.registerFormat({
  name: 'css/variables-themed',
  formatter: function ({ dictionary, options }) {
    const { theme } = options;
    // const header = styledDictionary.formatHelpers.fileHeader({ file });
    const cssVariables = dictionary.allProperties.map(properties => {
      const [, ...path] = properties.path;
      return `${pathToCssVariable(path)}: ${properties.value};`;
    });
    return `:root .${theme} {\n\t${cssVariables.join('\n\t')}\n}\n`;
  },
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
  THEMES.map(theme => {
    console.log('\n==============================================');
    console.log(`\nCreating theme - ${theme}`);

    const StyleDictionary = styledDictionary.extend(
      generateStyleDictionaryConfig({ theme, dir: TEMP_DIR })
    );
    StyleDictionary.buildPlatform('web');

    console.log(`\nFinish theme - ${theme}`);
  });

  if (!fs.existsSync(OUT_DIR)) {
    console.log('Creating output dir');
    fs.mkdirSync(OUT_DIR);
  }

  console.log('Merging styles into one file');
  fs.writeFileSync(
    `${OUT_DIR}/index.css`,
    readContents(
      TEMP_DIR,
      THEMES.map(theme => `${theme}.css`)
    )
  );

  console.log('\n==============================================');
  console.log('\nBuild completed!');
};

void build();
