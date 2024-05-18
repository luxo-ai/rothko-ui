import React, { useState } from 'react';

import { Checkbox } from '@rothko-ui/ui';

const App = () => {
  const [checked, setChecked] = useState(false);
  return <Checkbox checked={checked} onChange={v => setChecked(v)} />;
};

export default App;
