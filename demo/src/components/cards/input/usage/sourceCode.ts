export const BASIC = `
import { Input } from '@rothko-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState<string>('');

  return (
    <Input placeholder="Email" value={value} onChange={e => setValue(e.currentTarget.value)} />
  );
};

export default App;
`;
export const DISABLED = `
import { Input } from '@rothko-ui/react';
import React from 'react';

const App = () => {
  return <Input placeholder="Email" disabled />;
};

export default App;
`;
