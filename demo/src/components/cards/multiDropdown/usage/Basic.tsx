import React, { useState } from 'react';

import { MultiDropdown } from '@rothko-ui/ui';

const DROPDOWN_OPTIONS = [
  {
    id: 0,
    label: 'Zero',
  },
  {
    id: 1,
    label: 'One',
  },
  {
    id: 2,
    label: 'Two',
  },
];

const App = () => {
  const [selected, setSelected] = useState<number[] | null>(null);
  return (
    <MultiDropdown values={selected} onChange={v => setSelected(v)} options={DROPDOWN_OPTIONS} />
  );
};

export default App;
