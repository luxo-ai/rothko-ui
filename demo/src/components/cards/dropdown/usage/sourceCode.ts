export const BASIC = `
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
];

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);
  return <Dropdown value={selected} onChange={v => setSelected(v)} options={DROPDOWN_OPTIONS} />;
};

export default App;
`;
export const CLEARABLE = `
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
];

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <Dropdown
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
];

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <Dropdown disabled value={selected} onChange={v => setSelected(v)} options={DROPDOWN_OPTIONS} />
  );
};

export default App;
`;
export const MENU_POSITION = `
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
];

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <Dropdown
      menuPosition="top"
      value={selected}
      onChange={v => setSelected(v)}
      options={DROPDOWN_OPTIONS}
    />
  );
};

export default App;
`;
export const SEARCHABLE = `
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
];

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <Dropdown search value={selected} onChange={v => setSelected(v)} options={DROPDOWN_OPTIONS} />
  );
};

export default App;
`;
