import type { Dictionary } from './types';

/**
 * based on https://www.npmjs.com/package/clsx
 */
type Falsey = number | false | null | undefined;

type Arg<ClassName extends string> =
  | ClassName
  | Falsey
  | Dictionary<ClassName, string | true | Falsey>;

const classesInner = <ClassName extends string>(...args: Arg<ClassName>[]) => {
  const strings: ClassName[] = [];

  for (const arg of args) {
    if (typeof arg === 'string') {
      strings.push(arg);
    } else if (typeof arg === 'object' && arg !== null) {
      strings.push(...(Object.keys(arg) as ClassName[]).filter(key => Boolean(arg[key])));
    }
  }

  return strings;
};

export const classes = (...args: Arg<string>[]) => {
  return classesInner(...args).join(' ');
};

export const scopedClasses = <ClassName extends string>(scope: Dictionary<ClassName, string>) => {
  return (...args: Arg<ClassName>[]) => {
    return classesInner(...args)
      .map(key => scope[key])
      .join(' ');
  };
};
