export const BASIC = `
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
`;
export const DISABLED = `
import { Textarea } from '@rothko-ui/react';
import React from 'react';

const App = () => {
  return <Textarea placeholder="Comments..." disabled />;
};

export default App;
`;
