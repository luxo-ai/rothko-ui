import React, { useState } from 'react';

import { Slider } from '@rothko-ui/ui';

const App = () => {
  const [value, setValue] = useState<number>(50);
  return <Slider label="Percent" showValue value={value} onChange={setValue} min={0} max={100} />;
};

export default App;
