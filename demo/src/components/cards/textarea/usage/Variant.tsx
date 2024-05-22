import React, { useState } from 'react';
import { Textarea } from '@rothko-ui/ui';

const App = () => {
  const [valueBold, setValueBold] = useState<string>('');
  const [valueLight, setValueLight] = useState<string>('');
  const [valueItalic, setValueItalic] = useState<string>('');

  return (
    <>
      <Textarea
        placeholder="Bold"
        variant="bold"
        value={valueBold}
        onChange={e => setValueBold(e.currentTarget.value)}
      />
      <Textarea
        placeholder="Light"
        variant="light"
        value={valueLight}
        onChange={e => setValueLight(e.currentTarget.value)}
      />
      <Textarea
        placeholder="Italic"
        variant="italic"
        value={valueItalic}
        onChange={e => setValueItalic(e.currentTarget.value)}
      />
    </>
  );
};

export default App;
