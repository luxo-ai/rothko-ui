export const pathToCssVariable = (path: string[], prefix?: string) => {
  return `--${(prefix ? [prefix, ...path] : path).join('-')}`;
};
