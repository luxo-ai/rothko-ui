const CSS_VARIABLE_PREFIX = 'rothko';

export const pathToCssVariable = (path: string[], prefix: string = CSS_VARIABLE_PREFIX) => {
  return `--${(prefix ? [prefix, ...path] : path).join('-')}`;
};
