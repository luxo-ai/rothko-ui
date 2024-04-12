import React from 'react';

import { TabBar } from '@rothko-ui/ui';

const TABS = [
  {
    title: 'One',
    key: 'one',
    render: <>{/* Screen one */}</>,
  },
  {
    title: 'Two',
    key: 'two',
    render: <>{/* Screen two */}</>,
  },
] as const;

const App = () => {
  return <TabBar tabs={TABS} />;
};

export default App;
