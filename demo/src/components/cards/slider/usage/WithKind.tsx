import React, { useState } from 'react';

import type { RothkoKind } from '@rothko-ui/ui';
import { Slider } from '@rothko-ui/ui';

const App = (props: { kind: RothkoKind }) => {
  const [value, setValue] = useState<number>(100);
  return (
    <Slider
      label="Percent"
      kind={props.kind}
      showValue
      value={value}
      onChange={setValue}
      min={0}
      max={100}
    />
  );
};

export default App;
