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
