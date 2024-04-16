export const COMPONENT_OVERRIDE = `
import React from 'react';

import { RothkoProvider } from '@rothko-ui/ui';

const App = ({ children }: { children?: React.ReactNode }) => {
  return <RothkoProvider>{children}</RothkoProvider>;
};

export default App;
`;
export const SEMANTIC_OVERRIDE = `
import React from 'react';

import { RothkoProvider } from '@rothko-ui/ui';

const App = ({ children }: { children?: React.ReactNode }) => {
  return <RothkoProvider>{children}</RothkoProvider>;
};

export default App;
`;
export const TYPOGRAPHY_OVERRIDE = `
import React from 'react';

import { RothkoProvider } from '@rothko-ui/ui';

const App = ({ children }: { children?: React.ReactNode }) => {
  return <RothkoProvider>{children}</RothkoProvider>;
};

export default App;
`;
