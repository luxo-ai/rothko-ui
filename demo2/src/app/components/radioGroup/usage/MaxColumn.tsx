import { Radio, RadioGroup } from '@rothko-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [selected, setSelected] = useState<string>();
  return (
    <RadioGroup label="Radio Group" maxCol={1} value={selected} onChange={v => setSelected(v)}>
      <Radio $key="one">One</Radio>
      <Radio $key="two">Two</Radio>
      <Radio $key="three">Three</Radio>
    </RadioGroup>
  );
};

export default App;
