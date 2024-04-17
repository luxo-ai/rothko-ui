import React, { useState } from 'react';

import type { RothkoKind } from '@rothko-ui/ui';
import { Switch } from '@rothko-ui/ui';

const App = (props: { kind: RothkoKind }) => {
  const [selected, setSelected] = useState(false);

  return <Switch kind={props.kind} selected={selected} onChange={v => setSelected(v)} />;
};

export default App;
