export const BASIC = `
import React, { useState } from 'react';
import { Input } from '@rothko-ui/react';

const App = () => {
  const [value, setValue] = useState<string>('');

  return (
    <Input placeholder="Email" value={value} onChange={e => setValue(e.currentTarget.value)} />
  );
};

export default App;
`;
export const DISABLED = `
import React from 'react';
import { Input } from '@rothko-ui/react';

const App = () => {
  return <Input placeholder="Email" disabled />;
};

export default App;
`;
