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
