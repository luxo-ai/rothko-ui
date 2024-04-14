import plugin from 'tailwindcss/plugin';
import type { LayoutConfig, RothkoPluginConfig, ThemeConfig, ThemeMode } from './types';
import deepmerge from 'deepmerge';
import defaults from './defaults';
import { compact, mapKeys, objectIsNonEmpty, toKebabCase } from '@rothko-ui/utils';
import { flatten } from 'flat';
import { generateSpacingScale } from './utils';

const DEFAULT_VARIABLE_PREFIX = 'rothko';
const DEFAULT_THEME = 'light';

const rothkoUiPlugin = (config: RothkoPluginConfig = {}) => {
  const {
    defaultTheme = DEFAULT_THEME,
    variablePrefix = DEFAULT_VARIABLE_PREFIX,
    layout: layoutConfig = {},
    themes: themesConfig = {},
  } = config;

  const lightConfig = themesConfig?.light || {};
  const darkConfig = themesConfig?.dark || {};

  const layout: LayoutConfig = objectIsNonEmpty(layoutConfig)
    ? deepmerge(defaults.layout, layoutConfig)
    : defaults.layout;

  const light: ThemeConfig = objectIsNonEmpty(lightConfig)
    ? deepmerge(defaults.light, lightConfig)
    : defaults.light;

  const dark: ThemeConfig = objectIsNonEmpty(darkConfig)
    ? deepmerge(defaults.dark, darkConfig)
    : defaults.dark;

  const resolved = resolveConfig(layout, { light, dark }, defaultTheme, variablePrefix);

  return plugin(
    ({ addBase, addUtilities, addVariant }) => {
      addBase({
        [':root']: {
          color: `var(--${variablePrefix}-foreground, blue)`,
          backgroundColor: `var(--${variablePrefix}-background, green)`,
        },
      });

      // add the css variables to "@layer utilities"
      addUtilities({ ...resolved?.utilities }); //...utilities }); (defauts)
      // add the theme as variant e.g. "[theme-name]:text-2xl"
      resolved?.variants.forEach(variant => {
        addVariant(variant.name, variant.definition);
      });
    },
    {
      theme: {
        extend: {
          colors: resolved.colors as any,
          scale: {
            '80': '0.8',
            '85': '0.85',
          },
          height: {
            divider: `var(--${variablePrefix}-divider-weight)`,
          },
          width: {
            divider: `var(--${variablePrefix}-divider-weight)`,
          },
          spacing: {
            unit: `var(--${variablePrefix}-spacing-unit)`,
            // ...createSpacingUnits(prefix),
          },
          minWidth: {
            // ...minSizes,
          },
          minHeight: {
            // ...minSizes,
          },
          fontSize: {
            tiny: [
              `var(--${variablePrefix}-font-size-tiny)`,
              `var(--${variablePrefix}-line-height-tiny)`,
            ],
            small: [
              `var(--${variablePrefix}-font-size-small)`,
              `var(--${variablePrefix}-line-height-small)`,
            ],
            medium: [
              `var(--${variablePrefix}-font-size-medium)`,
              `var(--${variablePrefix}-line-height-medium)`,
            ],
            large: [
              `var(--${variablePrefix}-font-size-large)`,
              `var(--${variablePrefix}-line-height-large)`,
            ],
          },
          borderRadius: {
            small: `var(--${variablePrefix}-radius-small)`,
            medium: `var(--${variablePrefix}-radius-medium)`,
            large: `var(--${variablePrefix}-radius-large)`,
          },
          opacity: {
            hover: `var(--${variablePrefix}-hover-opacity)`,
            disabled: `var(--${variablePrefix}-disabled-opacity)`,
          },
          borderWidth: {
            small: `var(--${variablePrefix}-border-width-small)`,
            medium: `var(--${variablePrefix}-border-width-medium)`,
            large: `var(--${variablePrefix}-border-width-large)`,
            1: '1px',
            1.5: '1.5px',
            3: '3px',
            5: '5px',
          },
          boxShadow: {
            small: `var(--${variablePrefix}-box-shadow-small)`,
            medium: `var(--${variablePrefix}-box-shadow-medium)`,
            large: `var(--${variablePrefix}-box-shadow-large)`,
          },
          transitionDuration: {
            0: '0ms',
            250: '250ms',
            400: '400ms',
          },
        },
      },
    }
  );
};

const resolveConfig = (
  layout: LayoutConfig,
  themes: Record<ThemeMode, ThemeConfig>,
  defaultTheme: ThemeMode,
  prefix: string
) => {
  const resolved: {
    variants: { name: string; definition: string[] }[];
    utilities: Record<string, Record<string, any>>;
    colors: Record<
      string,
      ({
        opacityValue,
        opacityVariable,
      }: {
        opacityValue: string;
        opacityVariable: string;
      }) => string
    >;
  } = {
    variants: [],
    utilities: {},
    colors: {},
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [themeName, { component, colors }] of Object.entries(themes)) {
    const scheme = themeName;

    // if the theme is the default theme, add the selector to the root element
    const cssSelector = compact([themeName === defaultTheme && ':root', `.${themeName}`]).join(',');

    resolved.utilities[cssSelector] = {
      'color-scheme': scheme,
    };

    // flatten color definitions
    const flatColors = flatten<typeof colors, Record<string, string>>(colors, {
      safe: true,
      delimiter: '-',
    });

    const flatComponents = flatten<typeof component, Record<string, string>>(component, {
      safe: true,
      delimiter: '-',
    });

    const flatLayout = mapKeys(layout, key => toKebabCase(key));

    // resolved.variants
    resolved.variants.push({
      name: themeName,
      definition: [`&.${themeName}`],
    });

    /**
     * Colors
     */
    for (const [colorName, colorValue] of Object.entries(flatColors)) {
      const colorVariable = `--${prefix}-${colorName}`;

      // set the css variable in "@layer utilities"
      resolved.utilities[cssSelector]![colorVariable] = colorValue;

      // set the dynamic color in tailwind config theme.colors
      resolved.colors[colorName] = ({ opacityVariable, opacityValue }) => {
        // if the opacity is set  with a slash (e.g. bg-primary/90), use the provided value
        if (!isNaN(+opacityValue)) {
          return `var(${colorVariable}) / ${opacityValue}`;
        }
        // if no opacityValue was provided (=it is not parsable to a number)
        // the nextuiOpacityVariable (opacity defined in the color definition rgb(0, 0, 0, 0.5)) should have the priority
        // over the tw class based opacity(e.g. "bg-opacity-90")
        // This is how tailwind behaves as for v3.2.4
        if (opacityVariable) {
          return `var(${colorVariable}) / var(${opacityVariable})`;
        }

        return `var(${colorVariable})`;
      };
    }

    /**
     * Components
     */
    for (const [componentName, componentValue] of Object.entries(flatComponents)) {
      const componentVariable = `--${prefix}-${componentName}`;
      // set the css variable in "@layer utilities"
      resolved.utilities[cssSelector]![componentVariable] = componentValue;
    }

    /**
     * Layout
     */
    for (const [key, value] of Object.entries(flatLayout)) {
      const layoutVariablePrefix = `--${prefix}-${key}`;

      if (typeof value === 'object') {
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          const nestedLayoutVariable = `${layoutVariablePrefix}-${nestedKey}`;

          resolved.utilities[cssSelector]![nestedLayoutVariable] = nestedValue;
        }
      } else {
        // Process base units and spacing scale
        if (key === 'spacing-unit') {
          resolved.utilities[cssSelector]![layoutVariablePrefix] = value; // Add the base unit

          const spacingScale = generateSpacingScale(Number(value));

          for (const [scaleKey, scaleValue] of Object.entries(spacingScale)) {
            const spacingVariable = `${layoutVariablePrefix}-${scaleKey}`;

            resolved.utilities[cssSelector]![spacingVariable] = scaleValue;
          }
        } else {
          // Handle opacity values and other singular layout values
          const formattedValue =
            layoutVariablePrefix.includes('opacity') && typeof value === 'number'
              ? value.toString().replace(/^0\./, '.')
              : value;

          resolved.utilities[cssSelector]![layoutVariablePrefix] = formattedValue;
        }
      }
    }
  }

  return resolved;
};

/*
export default plugin(({ addComponents, theme, e, prefix }) => {
  const { prefix: configPrefix, theme: configTheme } = theme('rothkoPlugin', DEFAULT_CONFIG);

  const prefixer = className => `${configPrefix}-${className}`;

  const darkTheme = theme('rothkoPlugin.dark');
  const lightTheme = theme('rothkoPlugin.light');

  const darkClasses = Object.entries(darkTheme).map(([key, value]) => {
    return {
      [`.${prefixer(key)}`]: value,
    };
  });

  const lightClasses = Object.entries(lightTheme).map(([key, value]) => {
    return {
      [`.${prefixer(key)}`]: value,
    };
  });

  addComponents([
    {
      [`.${prefixer('dark')}`]: {
        '@apply': darkClasses,
      },
    },
    {
      [`.${prefixer('light')}`]: {
        '@apply': lightClasses,
      },
    },
  ]);
});
*/

export default rothkoUiPlugin;
