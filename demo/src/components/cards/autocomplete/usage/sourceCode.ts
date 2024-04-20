export const BASIC = `
import React, { useState } from 'react';

import { Autocomplete } from '@rothko-ui/ui';

const AUTOCOMPLETE_OPTIONS = [
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
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <Autocomplete value={selected} onChange={v => setSelected(v)} options={AUTOCOMPLETE_OPTIONS} />
  );
};

export default App;
`;
