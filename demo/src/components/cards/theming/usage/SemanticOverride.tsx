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
