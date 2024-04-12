export const COMPONENT_OVERRIDE = `
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
`;
export const SEMANTIC_OVERRIDE = `
import React from 'react';

import { RothkoProvider } from '@rothko-ui/ui';

const App = ({ children }: { children?: React.ReactNode }) => {
  return (
    <RothkoProvider
      themeOverrides={{
        dark: {
          success: {
            500: { value: '#276c27' },
          },
        },
        light: {
          success: {
            500: { value: '#11b811' },
          },
        },
      }}
    >
      {children}
    </RothkoProvider>
  );
};

export default App;
`;
export const TYPOGRAPHY_OVERRIDE = `
import React from 'react';

import { RothkoProvider } from '@rothko-ui/ui';

const App = ({ children }: { children?: React.ReactNode }) => {
  return (
    <RothkoProvider
      themeOverrides={{
        typography: {
          body: {
            regular: {
              value: "'Soehne-Buch', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
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
`;
