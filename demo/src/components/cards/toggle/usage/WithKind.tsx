import React, { useState } from 'react';

import type { RothkoKind } from '@rothko-ui/ui';
import { Toggle } from '@rothko-ui/ui';

const App = (props: { kind: RothkoKind }) => {
  const [toggled, setToggled] = useState(false);

  return <Toggle kind={props.kind} toggled={toggled} onChange={v => setToggled(v)} />;
};

export default App;
