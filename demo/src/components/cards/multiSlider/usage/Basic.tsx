import React, { useState } from 'react';

import { MultiSlider, SliderHandle } from '@rothko-ui/components';

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
