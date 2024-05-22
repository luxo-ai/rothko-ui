export const BASIC = `
import React, { useState } from 'react';

import { RadioGroup, Radio } from '@rothko-ui/ui';

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
`;
export const DISABLED = `
import React, { useState } from 'react';

import { Radio, RadioGroup } from '@rothko-ui/ui';

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
`;
export const MAX_COLUMN = `
import React, { useState } from 'react';

import { Radio, RadioGroup } from '@rothko-ui/ui';

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
`;
