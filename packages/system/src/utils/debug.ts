export const debugFactory = (module?: string) => {
  const debuggerActive = Boolean(typeof process !== 'undefined' && process.env?.ROTHKO_DEBUG);
  return (...argz: (string | Record<string, unknown> | symbol | number)[]) => {
    if (debuggerActive) {
      // eslint-disable-next-line no-console
      console.log(`[rokthko-ui${module ? `:${module}` : ''}]`, ...argz);
    }
  };
};
