export const BASIC = `
import React, { useState } from 'react';
import { Input } from '@rothko-ui/ui';

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
import { Input } from '@rothko-ui/ui';

const App = () => {
  return <Input placeholder="Email" disabled />;
};

export default App;
`;
export const VARIANT = `
import React, { useState } from 'react';
import { Input } from '@rothko-ui/ui';

const App = () => {
  const [valueBold, setValueBold] = useState<string>('');
  const [valueLight, setValueLight] = useState<string>('');
  const [valueItalic, setValueItalic] = useState<string>('');

  return (
    <>
      <Input
        placeholder="Email (Bold)"
        variant="bold"
        value={valueBold}
        onChange={e => setValueBold(e.currentTarget.value)}
      />
      <Input
        placeholder="Email (Light)"
        variant="light"
        value={valueLight}
        onChange={e => setValueLight(e.currentTarget.value)}
      />
      <Input
        placeholder="Email (Italic)"
        variant="italic"
        value={valueItalic}
        onChange={e => setValueItalic(e.currentTarget.value)}
      />
    </>
  );
};

export default App;
`;
