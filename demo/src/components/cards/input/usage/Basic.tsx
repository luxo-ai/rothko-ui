import React, { useState } from 'react';

import { Input } from '@rothko-ui/ui';

const App = () => {
  const [value, setValue] = useState<string>('');

  return <Input value={value} onChange={e => setValue(e.currentTarget.value)} />;
};

export default App;
