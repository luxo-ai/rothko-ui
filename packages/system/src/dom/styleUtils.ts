import { toCamelCase } from '../utils/helpers';

export const browserPrefixes = ['-moz', '-webkit', '-o', '-ms'] as const;
export type BrowserPrefix = (typeof browserPrefixes)[number];

export const getCssKeyWithBrowserPrefix = (cssKey: string) => {
  if (typeof window === 'undefined') return cssKey;

  const el = window.document?.documentElement;
  if (!el) return cssKey;

  const docStyle = window.getComputedStyle(el);
  if (!docStyle) return cssKey;

  for (const prefix of browserPrefixes) {
    const withPrefix = `${prefix}-${cssKey}`;
    if (toCamelCase(withPrefix) in docStyle) {
      return withPrefix;
    }
  }
  return cssKey;
};

type Position = { x?: number; y?: number };
type Unit = 'px' | '%' | 'rem' | 'em';

export const getInlineCSSTranslation = ({ x = 0, y = 0 }: Position, unit: Unit = 'px') => {
  const key = getCssKeyWithBrowserPrefix('transform');
  const value = `translate(${x}${unit},${y}${unit})`;
  return { [toCamelCase(key)]: value };
};
