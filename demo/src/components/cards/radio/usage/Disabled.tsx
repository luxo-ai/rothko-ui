import React, { useState } from 'react';

import { Radio, RadioGroup } from '@rothko-ui/components';

const App = () => {
  const [selected, setSelected] = useState<string>();
  return (
    <RadioGroup label="Radio Group" disabled value={selected} onChange={v => setSelected(v)}>
      <Radio $key="one">One</Radio>
      <Radio $key="two">Two</Radio>
      <Radio $key="three">Three</Radio>
    </RadioGroup>
  );
};

export default App;
