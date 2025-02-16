export const BASIC = `
import { Select } from '@rothko-ui/react';
import React, { useState } from 'react';

import { listOfNames } from './listOfNames';

const nameOptions = listOfNames.map((name, idx) => ({ id: idx, label: name }));

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return <Select value={selected} onChange={v => setSelected(v)} options={nameOptions} />;
};

export default App;
`;
export const CLEARABLE = `
import { Select } from '@rothko-ui/react';
import React, { useState } from 'react';

import { listOfNames } from './listOfNames';

const nameOptions = listOfNames.map((name, idx) => ({ id: idx, label: name }));

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return <Select clearable value={selected} onChange={v => setSelected(v)} options={nameOptions} />;
};

export default App;
`;
export const DISABLED = `
import { Select } from '@rothko-ui/react';
import React, { useState } from 'react';

import { listOfNames } from './listOfNames';

const nameOptions = listOfNames.map((name, idx) => ({ id: idx, label: name }));

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return <Select disabled value={selected} onChange={v => setSelected(v)} options={nameOptions} />;
};

export default App;
`;
export const MENU_VARIANT = `
import { Select } from '@rothko-ui/react';
import React, { useState } from 'react';

import { listOfNames } from './listOfNames';

const nameOptions = listOfNames.map((name, idx) => ({ id: idx, label: name }));

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <Select
      menuVariant="top"
      value={selected}
      onChange={v => setSelected(v)}
      options={nameOptions}
    />
  );
};

export default App;
`;
export const RENDER_OPTION = `
import type { Option } from '@rothko-ui/react';
import { Select, Paragraph } from '@rothko-ui/react';
import React, { useState } from 'react';

import { listOfNamesWithUsername } from './listOfNames';

const nameOptions: Option<number, { username: string }>[] = listOfNamesWithUsername.map(
  (user, idx) => ({
    id: idx,
    label: user.name,
    data: { username: user.username },
  })
);

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Select
      value={selected}
      onChange={v => setSelected(v)}
      options={nameOptions}
      renderOption={({ option }) => (
        <Paragraph size="s">
          {option.label}{' '}
          <Paragraph size="xs" variant="italic" as="span">
            ({option.data.username})
          </Paragraph>
        </Paragraph>
      )}
    />
  );
};

export default App;
`;
