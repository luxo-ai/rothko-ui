export const BASIC = `
import React, { useState } from 'react';

import { NestedDropdown } from '@rothko-ui/ui';

const DROPDOWN_OPTIONS = [
  {
    id: '0',
    label: 'Sub',
    subcategories: [
      {
        id: '0:1',
        label: 'Sub-One',
      },
      {
        id: '0:2',
        label: 'Sub-Two',
      },
      { id: '03', label: 'Sub-Three' },
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
`;
export const CLEARABLE = `
import React, { useState } from 'react';

import { NestedDropdown } from '@rothko-ui/ui';

const DROPDOWN_OPTIONS = [
  {
    id: '0',
    label: 'Sub',
    subcategories: [
      {
        id: '0:1',
        label: 'Sub-One',
      },
      {
        id: '0:2',
        label: 'Sub-Two',
      },
      { id: '03', label: 'Sub-Three' },
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
    <NestedDropdown
      clearable
      value={selected}
      onChange={v => setSelected(v)}
      options={DROPDOWN_OPTIONS}
    />
  );
};

export default App;
`;
export const DISABLED = `
import React, { useState } from 'react';

import { NestedDropdown } from '@rothko-ui/ui';

const DROPDOWN_OPTIONS = [
  {
    id: '0',
    label: 'Sub',
    subcategories: [
      {
        id: '0:1',
        label: 'Sub-One',
      },
      {
        id: '0:2',
        label: 'Sub-Two',
      },
      { id: '03', label: 'Sub-Three' },
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
    <NestedDropdown
      disabled
      value={selected}
      onChange={v => setSelected(v)}
      options={DROPDOWN_OPTIONS}
    />
  );
};

export default App;
`;
export const MENU_POSITION = `
import React, { useState } from 'react';

import { NestedDropdown } from '@rothko-ui/ui';

const DROPDOWN_OPTIONS = [
  {
    id: '0',
    label: 'Sub',
    subcategories: [
      {
        id: '0:1',
        label: 'Sub-One',
      },
      {
        id: '0:2',
        label: 'Sub-Two',
      },
      { id: '03', label: 'Sub-Three' },
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
    <NestedDropdown
      menuPosition="top"
      value={selected}
      onChange={v => setSelected(v)}
      options={DROPDOWN_OPTIONS}
    />
  );
};

export default App;
`;
