import React, { useState } from 'react';
import type { NestedOption } from '@rothko-ui/ui';
import { NestedSelect } from '@rothko-ui/ui';

const DROPDOWN_OPTIONS: NestedOption<string>[] = [
  {
    id: '0',
    label: 'Sub',
    options: [
      {
        id: '0:1',
        label: 'Sub-One',
      },
      {
        id: '0:2',
        label: 'Sub-Two',
      },
      {
        id: '03',
        label: 'Sub-Three',
      },
    ],
  },
  {
    id: '1',
    label: 'Two',
  },
  {
    id: '2',
    label: 'Three',
  },
];

const App = () => {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <NestedSelect
      disabled
      value={selected}
      onChange={v => setSelected(v)}
      options={DROPDOWN_OPTIONS}
    />
  );
};

export default App;
