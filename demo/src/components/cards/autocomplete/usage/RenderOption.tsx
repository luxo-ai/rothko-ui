import React, { useState } from 'react';
import type { Option } from '@rothko-ui/ui';
import { Autocomplete, Typography } from '@rothko-ui/ui';
import { listOfCountriesWithFlags } from './listOfCountries';

const countryOptions: Option<number, { flag: string }>[] = listOfCountriesWithFlags.map(
  (country, idx) => ({
    id: idx,
    label: country.name,
    data: { flag: country.flag },
  })
);

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Autocomplete
      value={selected}
      onChange={v => setSelected(v)}
      options={countryOptions}
      renderOption={({ option }) => (
        <Typography.bodySmall>
          <span style={{ marginRight: '0.5rem' }}>{option.data.flag}</span>
          {option.label}
        </Typography.bodySmall>
      )}
    />
  );
};

export default App;
