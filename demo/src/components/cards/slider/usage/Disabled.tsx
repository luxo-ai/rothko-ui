import React, { useState } from 'react';

import { Slider } from '@rothko-ui/react';

const App = () => {
  const [value, setValue] = useState<number>(25);
  return <Slider disabled kind="primary" value={value} onChange={setValue} min={0} max={100} />;
};

export default App;
