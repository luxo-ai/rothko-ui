export const BASIC = `
import React, { useState } from 'react';
import { Textarea } from '@rothko-ui/react';

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
import React from 'react';
import { Textarea } from '@rothko-ui/react';

const App = () => {
  return <Textarea placeholder="Comments..." disabled />;
};

export default App;
`;
