import React, { useState } from 'react';

import { RadioGroup, Radio } from '@rothko-ui/components';

const App = () => {
  const [selected, setSelected] = useState<string>();
  return (
    <RadioGroup label="Radio Group" value={selected} onChange={v => setSelected(v)}>
      <Radio $key="one">One</Radio>
      <Radio $key="two">Two</Radio>
      <Radio $key="three">Three</Radio>
    </RadioGroup>
  );
};

export default App;
