import React, { useState } from 'react';

import type { NestedOption } from '@rothko-ui/ui';
import { NestedDropdown } from '@rothko-ui/ui';

const DROPDOWN_OPTIONS: NestedOption<string>[] = [
  {
    id: '0',
    label: 'Substack group',
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
        options: [
          {
            id: '0:3:1',
            label: 'Sub-Three-One',
          },
          {
            id: '0:3:2',
            label: 'Sub-Three-Two',
            options: [
              {
                id: '0:3:2:1',
                label: 'Sub-Three-Two-One',
              },
              {
                id: '0:3:2:2',
                label: 'Sub-Three-Two-Two',
              },
            ],
          },
          {
            id: '0:3:3',
            label: 'Sub-Three-Three',
          },
        ],
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
    <NestedDropdown value={selected} onChange={v => setSelected(v)} options={DROPDOWN_OPTIONS} />
  );
};

export default App;
