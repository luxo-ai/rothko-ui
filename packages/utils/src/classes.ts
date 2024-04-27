/**
 * based on https://www.npmjs.com/package/clsx
 */
type Falsey = number | false | null | undefined;

const classes = (...args: (string | Falsey | Record<string, string | true | Falsey>)[]) => {
  const strings: string[] = [];

  for (const arg of args) {
    if (typeof arg === 'string') {
      strings.push(arg);
    } else if (typeof arg === 'object' && arg !== null) {
      strings.push(...Object.keys(arg).filter(key => Boolean(arg[key])));
    }
  }

  return strings.join(' ');
};

export default classes;
