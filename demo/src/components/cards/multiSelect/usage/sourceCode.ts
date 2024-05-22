export const BASIC = `
import React, { useState } from 'react';
import { MultiSelect } from '@rothko-ui/ui';

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
    <MultiSelect values={selected} onChange={v => setSelected(v)} options={DROPDOWN_OPTIONS} />
  );
};

export default App;
`;
export const CLEARABLE = `
import React, { useState } from 'react';
import { MultiSelect } from '@rothko-ui/ui';

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
    <MultiSelect
      clearable
      values={selected}
      onChange={v => setSelected(v)}
      options={DROPDOWN_OPTIONS}
    />
  );
};

export default App;
`;
export const DISABLED = `
import React, { useState } from 'react';
import { MultiSelect } from '@rothko-ui/ui';

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
    <MultiSelect
      disabled
      values={selected}
      onChange={v => setSelected(v)}
      options={DROPDOWN_OPTIONS}
    />
  );
};

export default App;
`;
export const MENU_POSITION = `
import React, { useState } from 'react';
import { MultiSelect } from '@rothko-ui/ui';

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
    <MultiSelect
      menuVariant="top"
      values={selected}
      onChange={v => setSelected(v)}
      options={DROPDOWN_OPTIONS}
    />
  );
};

export default App;
`;
