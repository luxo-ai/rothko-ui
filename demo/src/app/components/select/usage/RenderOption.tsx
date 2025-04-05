import type { Option } from '@rothko-ui/react';
import { Select, Paragraph, Code } from '@rothko-ui/react';
import React, { useState } from 'react';

import { listOfNamesWithUsername } from '@/components/card/listOfNames';
import { Grid } from '@/components/grid';

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
        <Grid gridTemplateColumns="3rem 1rem 1fr">
          <Paragraph size="s">{option.label}</Paragraph> /
          <Code size="s" style={{ width: 'fit-content' }}>
            ({option.data.username})
          </Code>
        </Grid>
      )}
    />
  );
};

export default App;
