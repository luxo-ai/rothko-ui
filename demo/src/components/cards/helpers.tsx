import type { RothkoKind } from '@rothko-ui/ui';

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
