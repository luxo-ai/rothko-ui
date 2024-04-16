import React from 'react';

import { RothkoProvider } from '@rothko-ui/ui';

const App = ({ children }: { children?: React.ReactNode }) => {
  return <RothkoProvider>{children}</RothkoProvider>;
};

export default App;
