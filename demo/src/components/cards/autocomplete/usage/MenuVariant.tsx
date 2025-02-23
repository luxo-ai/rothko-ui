import { Autocomplete } from '@rothko-ui/react';
import React, { useState } from 'react';

import { listOfCountries } from '@/components/cards/listOfCountries';

const countryOptions = listOfCountries.map((country, idx) => ({ id: idx, label: country }));

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Autocomplete
      menuVariant="top"
      value={selected}
      onChange={v => setSelected(v)}
      options={countryOptions}
    />
  );
};

export default App;
