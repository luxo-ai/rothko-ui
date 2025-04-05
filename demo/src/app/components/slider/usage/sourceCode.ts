export const BASIC = `
import { Slider, SliderHandle } from '@rothko-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState<number>(50);
  return (
    <Slider value={value} onChange={setValue} min={0} max={100}>
      <SliderHandle />
    </Slider>
  );
};

export default App;
`;
export const DISABLED = `
import { Slider } from '@rothko-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState<number>(25);
  return <Slider disabled kind="primary" value={value} onChange={setValue} min={0} max={100} />;
};

export default App;
`;
export const WITH_KIND = `
import { Slider } from '@rothko-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState<number>(100);
  return <Slider kind="info" value={value} onChange={setValue} min={0} max={100} />;
};

export default App;
`;
