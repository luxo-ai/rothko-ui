export const BASIC = `
import React, { useState } from 'react';
import { Select } from '@rothko-ui/ui';
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
import { Select } from '@rothko-ui/ui';
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
import { Select } from '@rothko-ui/ui';
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
import { Select } from '@rothko-ui/ui';
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
import type { Option } from '@rothko-ui/ui';
import { Select, Typography } from '@rothko-ui/ui';
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
        <Typography.bodySmall>
          {option.label}{' '}
          <Typography.caption italic as="span">
            ({option.data.username})
          </Typography.caption>
        </Typography.bodySmall>
      )}
    />
  );
};

export default App;
`;
