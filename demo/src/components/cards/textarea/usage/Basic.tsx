import React, { useState } from 'react';
import { Textarea } from '@rothko-ui/ui';

const App = () => {
  const [value, setValue] = useState<string>('');

  return <Textarea value={value} onChange={e => setValue(e.currentTarget.value)} />;
};

export default App;
