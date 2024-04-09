import React, { useState } from 'react';

import { RadioGroup } from '@rothko-ui/ui';

const RADIO_OPTIONS = [
  {
    id: '1',
    label: 'One',
  },
  {
    id: '2',
    label: 'Two',
  },
  {
    id: '3',
    label: 'Three',
  },
];

const App = () => {
  const [selected, setSelected] = useState<string>();
  return (
    <RadioGroup
      label="Radio Group"
      maxCol={4}
      value={selected}
      onChange={v => setSelected(v)}
      options={RADIO_OPTIONS}
    />
  );
};

export default App;
