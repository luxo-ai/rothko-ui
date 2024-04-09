import React, { createContext, useCallback, useContext, useEffect } from 'react';

const DebuggerContext = createContext<boolean>(false);

type DebuggerContextProviderProps = {
  children: React.ReactNode;
  debug?: boolean;
};

export const DebuggerContextProvider = ({
  children,
  debug = false,
}: DebuggerContextProviderProps) => {
  useEffect(() => {
    if (debug) {
      // eslint-disable-next-line no-console
      console.warn("Rothko Debugger is active!! Ensure you're not in production!");
    }
  }, [debug]);

  return <DebuggerContext.Provider value={debug}>{children}</DebuggerContext.Provider>;
};

export const useDebuggerContext = (module?: string) => {
  const debuggerActive = useContext(DebuggerContext);
  const debug = useCallback(
    (...argz: (string | Record<string, unknown> | symbol | number)[]) => {
      if (debuggerActive) {
        // eslint-disable-next-line no-console
        console.log(`[rokthko-ui${module ? `:${module}` : ''}]`, ...argz);
      }
    },
    [debuggerActive, module]
  );

  return debug;
};
