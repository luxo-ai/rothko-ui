export const debugFactory = (module?: string) => {
  const canDebug = false; // process.env.NODE_ENV !== 'production' && process.env.DEBUG === '1';
  return (...argz: (string | Record<string, unknown> | symbol | number)[]) => {
    if (canDebug) {
      console.log(`[rokthko-ui${module ? `:${module}` : ''}]`, ...argz);
    }
  };
};

type ArrLike<T> = {
  [index: number]: T;
  length: number;
};

export const findBy = <T>(arr: ArrLike<T>, pred: (v: T) => boolean) => {
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    if (pred(val)) return val;
  }
};

export const parseDecimal = (val: string) => {
  return parseInt(val, 10);
};
