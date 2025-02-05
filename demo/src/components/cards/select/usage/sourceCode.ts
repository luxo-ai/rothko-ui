export const BASIC = `
import React, { useState } from 'react';
import { Select } from '@rothko-ui/components';
import { listOfNames } from './listOfNames';

const nameOptions = listOfNames.map((name, idx) => ({ id: idx, label: name }));

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return <Select value={selected} onChange={v => setSelected(v)} options={nameOptions} />;
};

export default App;
`;
export const CLEARABLE = `
import React, { useState } from 'react';
import { Select } from '@rothko-ui/components';
import { listOfNames } from './listOfNames';

const nameOptions = listOfNames.map((name, idx) => ({ id: idx, label: name }));

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return <Select clearable value={selected} onChange={v => setSelected(v)} options={nameOptions} />;
};

export default App;
`;
export const DISABLED = `
import React, { useState } from 'react';
import { Select } from '@rothko-ui/components';
import { listOfNames } from './listOfNames';

const nameOptions = listOfNames.map((name, idx) => ({ id: idx, label: name }));

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return <Select disabled value={selected} onChange={v => setSelected(v)} options={nameOptions} />;
};

export default App;
`;
export const MENU_VARIANT = `
import React, { useState } from 'react';
import { Select } from '@rothko-ui/components';
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
import React, { useState } from 'react';
import type { Option } from '@rothko-ui/components';
import { Select, Paragraph } from '@rothko-ui/components';
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
          <Paragraph size="xs" italic as="span">
            ({option.data.username})
          </Paragraph>
        </Paragraph>
      )}
    />
  );
};

export default App;
`;
