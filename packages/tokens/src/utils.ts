export const pathToCssVariable = (path: string[]) => {
  return `--${path.join('-')}`;
};
