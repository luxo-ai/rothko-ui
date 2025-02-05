export const BASIC = `
import React, { useState } from 'react';
import { Textarea } from '@rothko-ui/components';

const App = () => {
  const [value, setValue] = useState<string>('');

  return <Textarea value={value} onChange={e => setValue(e.currentTarget.value)} />;
};

export default App;
`;
export const DISABLED = `
import React from 'react';
import { Textarea } from '@rothko-ui/components';

const App = () => {
  return <Textarea placeholder="Disabled" disabled />;
};

export default App;
`;
