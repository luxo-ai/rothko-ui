import React, { useState } from 'react';

import { Dropdown } from '@rothko-ui/ui';

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
  {
    id: 3,
    label: 'Three',
  },
  {
    id: 4,
    label: 'Four',
  },
  {
    id: 5,
    label: 'Five',
  },
  {
    id: 6,
    label: 'Six',
  },
  {
    id: 7,
    label: 'Seven',
  },
  {
    id: 8,
    label: 'Eight',
  },
  {
    id: 9,
    label: 'Nine',
  },
  {
    id: 10,
    label: 'Ten',
  },
];

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <Dropdown
      menuVariant="top"
      value={selected}
      onChange={v => setSelected(v)}
      options={DROPDOWN_OPTIONS}
    />
  );
};

export default App;
