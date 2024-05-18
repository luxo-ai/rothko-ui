export const DEFAULT_VARIABLE_PREFIX = 'rothko';
// const DEFAULT_THEME = 'light';
/*
const rothkoUiPlugin = (config: RothkoPluginConfig = {}) => {
  const {
    // defaultTheme = DEFAULT_THEME,
    variablePrefix = DEFAULT_VARIABLE_PREFIX,
    layout: layoutConfig = {},
    themes: themesConfig = {},
  } = config;

  const lightConfig = themesConfig?.light || {};
  const darkConfig = themesConfig?.dark || {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const layout: LayoutConfig = objectIsNonEmpty(layoutConfig)
   // ? deepmerge(defaults.layout, layoutConfig)
   // : defaults.layout;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const light: ThemeConfig = objectIsNonEmpty(lightConfig)
   // ? deepmerge(defaults.light, lightConfig)
   // : defaults.light;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const dark: ThemeConfig = objectIsNonEmpty(darkConfig)
  //  ? deepmerge(defaults.dark, darkConfig)
   // : defaults.dark;

  return plugin(({ addBase, addUtilities, addVariant }) => {
    addBase({
      [':root']: {
        color: `var(--${variablePrefix}-foreground, blue)`,
        backgroundColor: `var(--${variablePrefix}-background, green)`,
      },
    });

    addVariant('', '');
    addUtilities({});
  });
};


export default rothkoUiPlugin;
*/
