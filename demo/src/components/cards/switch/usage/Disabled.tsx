import React, { useState } from 'react';
import { Switch } from '@rothko-ui/components';

const App = () => {
  const [selected, setSelected] = useState(false);

  return <Switch disabled selected={selected} onChange={v => setSelected(v)} />;
};

export default App;
