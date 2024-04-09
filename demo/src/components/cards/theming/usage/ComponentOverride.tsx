import React from 'react';

import { RothkoProvider } from '@rothko-ui/ui';

const App = ({ children }: { children?: React.ReactNode }) => {
  return (
    <RothkoProvider
      themeOverrides={{
        dark: {
          slider: {
            handle: {
              background: { value: '#620a75' },
            },
          },
        },
        light: {
          slider: {
            handle: {
              background: { value: '#f4a460' },
            },
          },
        },
      }}
    >
      {children}
    </RothkoProvider>
  );
};

export default App;
