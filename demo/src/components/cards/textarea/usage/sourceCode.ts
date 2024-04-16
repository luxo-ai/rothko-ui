export const BASIC = `
import React, { useState } from 'react';

import { TextArea } from '@rothko-ui/ui';

const App = () => {
  const [value, setValue] = useState<string>('');

  return <TextArea value={value} onChange={e => setValue(e.currentTarget.value)} />;
};

export default App;
`;
