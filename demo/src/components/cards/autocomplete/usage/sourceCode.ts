export const BASIC = `
import { Autocomplete } from '@rothko-ui/react';
import React, { useState } from 'react';

import { listOfCountries } from '@/components/cards/listOfCountries';

const countryOptions = listOfCountries.map((country, idx) => ({ id: idx, label: country }));

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return <Autocomplete value={selected} onChange={v => setSelected(v)} options={countryOptions} />;
};

export default App;
`;
export const DISABLED = `
import { Autocomplete } from '@rothko-ui/react';
import React, { useState } from 'react';

import { listOfCountries } from '@/components/cards/listOfCountries';

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
`;
export const MENU_VARIANT = `
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
`;
export const RENDER_OPTION = `
import type { Option } from '@rothko-ui/react';
import { Autocomplete, Paragraph } from '@rothko-ui/react';
import React, { useState } from 'react';

import { listOfCountriesWithFlags } from '@/components/cards/listOfCountries';

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
        <Paragraph size="s">
          <span style={{ marginRight: '0.5rem' }}>{option.data.flag}</span>
          {option.label}
        </Paragraph>
      )}
    />
  );
};

export default App;
`;
