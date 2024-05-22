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
