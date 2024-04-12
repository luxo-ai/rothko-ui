import React, { useState } from 'react';

import { MultiSlider } from '@rothko-ui/ui';

const App = () => {
  const [value, setValue] = useState<[number, number]>([0, 50]);
  return (
    <MultiSlider
      label="Percent"
      kind="primary"
      valueFormat="%"
      showRange
      value={value}
      onChange={setValue}
      min={0}
      max={100}
    />
  );
};

export default App;
