export const pathToCssVariable = (path: string[], prefix?: string) => {
  return `--${(prefix ? [...path, prefix] : path).join('-')}`;
};
