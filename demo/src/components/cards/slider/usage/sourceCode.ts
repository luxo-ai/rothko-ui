export const BASIC = `
import React, { useState } from 'react';

import { Slider } from '@rothko-ui/ui';

const App = () => {
  const [value, setValue] = useState<number>(50);
  return (
    <Slider
      label="Percent"
      kind="primary"
      showValue
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

import { Slider } from '@rothko-ui/ui';

const App = () => {
  const [value, setValue] = useState<number>(25);
  return (
    <Slider
      label="Percent"
      disabled
      kind="primary"
      showValue
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

import { Slider } from '@rothko-ui/ui';

const App = () => {
  const [value, setValue] = useState<number>(75);
  return (
    <Slider
      label="Percent"
      kind="primary"
      valueFormat="%"
      showValue
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

import { Slider } from '@rothko-ui/ui';

const App = () => {
  const [value, setValue] = useState<number>(100);
  return (
    <Slider
      label="Percent" kind="info"
      showValue
      value={value}
      onChange={setValue}
      min={0}
      max={100}
    />
  );
};

export default App;
`;
