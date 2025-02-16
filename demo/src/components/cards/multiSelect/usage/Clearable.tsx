import { MultiSelect } from '@rothko-ui/react';
import React, { useState } from 'react';

import { listOfNames } from './listOfNames';

const nameOptions = listOfNames.map((name, idx) => ({ id: idx, label: name }));

const App = () => {
  const [selected, setSelected] = useState<number[] | null>(null);
  return (
    <MultiSelect clearable values={selected} onChange={v => setSelected(v)} options={nameOptions} />
  );
};

export default App;
