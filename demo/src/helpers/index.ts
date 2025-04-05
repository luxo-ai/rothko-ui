import type { RothkoKind } from '@rothko-ui/react';

export * from './extractAriaProps';

export const isSSR = typeof window === 'undefined';
export const isBrowser = !isSSR;

export const asUnionStr = (...arr: string[]): string => arr.map(item => `'${item}'`).join(' | ');

type Falsey = number | false | null | undefined | '';
type Arg = string | Falsey | Record<string, string | true | Falsey>;

export const classes = (...args: Arg[]) => {
  const classNames: string[] = [];

  for (const arg of args) {
    if (typeof arg === 'string' && arg !== '') {
      classNames.push(arg);
    } else if (typeof arg === 'object' && arg !== null) {
      classNames.push(...Object.keys(arg).filter(key => Boolean(arg[key])));
    }
  }

  return classNames.join(' ');
};

type PropValue = string | number | boolean | null;

export const insertKind = (code: string, kind: RothkoKind) => {
  return insertPropValue(code, { kind });
};

export const insertPropValue = (code: string, propNameToValues: Record<string, PropValue>) => {
  const escapedPropNamez: string[] = [];

  for (const propName in propNameToValues) {
    escapedPropNamez.push(propName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  }

  const pattern = new RegExp(
    `(${escapedPropNamez.join('|')})\\s*=\\s*(?:"[^"]*"|'[^']*'|\\{[^}]*\\})`,
    'g'
  );

  return code.replace(pattern, (_, propName) => {
    const propValue = propNameToValues[propName];
    return typeof propValue === 'string'
      ? `${propName}="${propValue}"`
      : `${propName}={${propValue}}`;
  });
};

export const startsWithHttpOrHttps = (url: string) => {
  return url.startsWith('http://') || url.startsWith('https://');
};
