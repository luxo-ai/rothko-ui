import { MultiSlider, SliderHandle } from '@rothko-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState<[number, number]>([0, 50]);
  return (
    <MultiSlider kind="primary" value={value} onChange={setValue} min={0} max={100}>
      <SliderHandle />
    </MultiSlider>
  );
};

export default App;
