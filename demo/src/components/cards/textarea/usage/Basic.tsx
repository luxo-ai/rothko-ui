import { Textarea } from '@rothko-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState<string>('');

  return (
    <Textarea
      placeholder="Comments..."
      value={value}
      onChange={e => setValue(e.currentTarget.value)}
    />
  );
};

export default App;
