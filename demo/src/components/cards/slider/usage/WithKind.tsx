import React, { useState } from 'react';

import type { RothkoKind } from '@rothko-ui/react';
import { Slider } from '@rothko-ui/react';

const App = (props: { kind: RothkoKind }) => {
  const [value, setValue] = useState<number>(100);
  return <Slider kind={props.kind} value={value} onChange={setValue} min={0} max={100} />;
};

export default App;
