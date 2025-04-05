import type { RothkoKind } from '@rothko-ui/react';
import { Switch } from '@rothko-ui/react';
import React, { useState } from 'react';

const App = (props: { kind: RothkoKind }) => {
  const [selected, setSelected] = useState(true);

  return <Switch kind={props.kind} selected={selected} onChange={v => setSelected(v)} />;
};

export default App;
