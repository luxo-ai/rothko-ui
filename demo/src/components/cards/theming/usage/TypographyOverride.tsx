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
