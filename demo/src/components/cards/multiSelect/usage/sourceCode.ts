export const BASIC = `
import React, { useState } from 'react';
import { MultiSelect } from '@rothko-ui/components';
import { listOfNames } from './listOfNames';

const nameOptions = listOfNames.map((name, idx) => ({ id: idx, label: name }));

const App = () => {
  const [selected, setSelected] = useState<number[] | null>(null);
  return <MultiSelect values={selected} onChange={v => setSelected(v)} options={nameOptions} />;
};

export default App;
`;
export const CLEARABLE = `
import React, { useState } from 'react';
import { MultiSelect } from '@rothko-ui/components';
import { listOfNames } from './listOfNames';

const nameOptions = listOfNames.map((name, idx) => ({ id: idx, label: name }));

const App = () => {
  const [selected, setSelected] = useState<number[] | null>(null);
  return (
    <MultiSelect clearable values={selected} onChange={v => setSelected(v)} options={nameOptions} />
  );
};

export default App;
`;
export const DISABLED = `
import React, { useState } from 'react';
import { MultiSelect } from '@rothko-ui/components';
import { listOfNames } from './listOfNames';

const nameOptions = listOfNames.map((name, idx) => ({ id: idx, label: name }));

const App = () => {
  const [selected, setSelected] = useState<number[] | null>(null);
  return (
    <MultiSelect disabled values={selected} onChange={v => setSelected(v)} options={nameOptions} />
  );
};

export default App;
`;
export const MENU_POSITION = `
import React, { useState } from 'react';
import { MultiSelect } from '@rothko-ui/components';
import { listOfNames } from './listOfNames';

const nameOptions = listOfNames.map((name, idx) => ({ id: idx, label: name }));

const App = () => {
  const [selected, setSelected] = useState<number[] | null>(null);
  return (
    <MultiSelect
      menuVariant="top"
      values={selected}
      onChange={v => setSelected(v)}
      options={nameOptions}
    />
  );
};

export default App;
`;
