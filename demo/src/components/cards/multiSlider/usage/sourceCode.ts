export const BASIC = `
import React, { useState } from 'react';

import { MultiSlider } from '@rothko-ui/ui';

const App = () => {
  const [value, setValue] = useState<[number, number]>([0, 50]);
  return (
    <MultiSlider
      label="Temperature"
      showRange
      kind="primary"
      value={value}
      onChange={setValue}
      min={0}
      max={100}
    />
  );
};

export default App;
`;
export const DISABLED = `
import React, { useState } from 'react';

import { MultiSlider } from '@rothko-ui/ui';

const App = () => {
  const [value, setValue] = useState<[number, number]>([0, 50]);
  return (
    <MultiSlider
      disabled
      showRange
      label="Percent"
      kind="primary"
      value={value}
      onChange={setValue}
      min={0}
      max={100}
    />
  );
};

export default App;
`;
export const FORMAT = `
import React, { useState } from 'react';

import { MultiSlider } from '@rothko-ui/ui';

const App = () => {
  const [value, setValue] = useState<[number, number]>([0, 50]);
  return (
    <MultiSlider
      label="Percent"
      kind="primary"
      postfix="%"
      showRange
      value={value}
      onChange={setValue}
      min={0}
      max={100}
    />
  );
};

export default App;
`;
export const WITH_KIND = `
import React, { useState } from 'react';

import { MultiSlider } from '@rothko-ui/ui';

const App = () => {
  const [value, setValue] = useState<[number, number]>([0, 50]);
  return (
    <MultiSlider
      label="Percent"
      showRange kind="info"
      value={value}
      onChange={setValue}
      min={0}
      max={100}
    />
  );
};

export default App;
`;
