export const BASIC = `
import React, { useState } from 'react';

import { MultiSlider, SliderHandle } from '@rothko-ui/react';

const App = () => {
  const [value, setValue] = useState<[number, number]>([0, 50]);
  return (
    <MultiSlider kind="primary" value={value} onChange={setValue} min={0} max={100}>
      <SliderHandle />
      <SliderHandle />
    </MultiSlider>
  );
};

export default App;
`;
export const DISABLED = `
import React, { useState } from 'react';

import { MultiSlider } from '@rothko-ui/react';

const App = () => {
  const [value, setValue] = useState<[number, number]>([0, 50]);
  return (
    <MultiSlider disabled kind="primary" value={value} onChange={setValue} min={0} max={100} />
  );
};

export default App;
`;
export const WITH_KIND = `
import React, { useState } from 'react';

import { MultiSlider } from '@rothko-ui/react';

const App = () => {
  const [value, setValue] = useState<[number, number]>([0, 50]);
  return <MultiSlider kind="info" value={value} onChange={setValue} min={0} max={100} />;
};

export default App;
`;
