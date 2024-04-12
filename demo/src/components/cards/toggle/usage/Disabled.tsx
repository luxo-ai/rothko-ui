import React, { useState } from 'react';

import { Toggle } from '@rothko-ui/ui';

const App = () => {
  const [toggled, setToggled] = useState(false);

  return <Toggle disabled toggled={toggled} onChange={v => setToggled(v)} />;
};

export default App;
