import React, { useState } from 'react';

import type { RothkoKind } from '@rothko-ui/components';
import { MultiSlider } from '@rothko-ui/components';

const App = (props: { kind: RothkoKind }) => {
  const [value, setValue] = useState<[number, number]>([0, 50]);
  return <MultiSlider kind={props.kind} value={value} onChange={setValue} min={0} max={100} />;
};

export default App;
