import React from 'react';

import type { RothkoKind } from '@rothko-ui/ui';
import { TabBar } from '@rothko-ui/ui';

const TABS = [
  {
    title: 'One',
    key: 'one',
    render: () => <>{/* Screen one */}</>,
  },
  {
    title: 'Two',
    key: 'two',
    render: () => <>{/* Screen two */}</>,
  },
] as const;

const App = (props: { kind: RothkoKind }) => {
  return <TabBar kind={props.kind} tabs={TABS} />;
};

export default App;
