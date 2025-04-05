import { Switch } from '@rothko-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [selected, setSelected] = useState(false);

  return <Switch disabled selected={selected} onChange={v => setSelected(v)} />;
};

export default App;
