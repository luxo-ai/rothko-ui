import React, { useState } from 'react';
import { Select } from '@rothko-ui/ui';
import { listOfNames } from './listOfNames';

const nameOptions = listOfNames.map((name, idx) => ({ id: idx, label: name }));

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return <Select disabled value={selected} onChange={v => setSelected(v)} options={nameOptions} />;
};

export default App;
