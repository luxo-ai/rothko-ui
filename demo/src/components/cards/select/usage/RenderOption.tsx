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
