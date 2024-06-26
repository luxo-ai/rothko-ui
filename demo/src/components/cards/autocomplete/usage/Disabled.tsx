import React, { useState } from 'react';
import { Autocomplete } from '@rothko-ui/ui';
import { listOfCountries } from './listOfCountries';

const countryOptions = listOfCountries.map((country, idx) => ({ id: idx, label: country }));

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Autocomplete
      disabled
      value={selected}
      onChange={v => setSelected(v)}
      options={countryOptions}
    />
  );
};

export default App;
