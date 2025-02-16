import type { RothkoKind } from '@rothko-ui/react';
import { MultiSlider } from '@rothko-ui/react';
import React, { useState } from 'react';

const App = (props: { kind: RothkoKind }) => {
  const [value, setValue] = useState<[number, number]>([0, 50]);
  return <MultiSlider kind={props.kind} value={value} onChange={setValue} min={0} max={100} />;
};

export default App;
