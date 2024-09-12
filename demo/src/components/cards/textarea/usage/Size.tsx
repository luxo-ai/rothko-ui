import React, { useState } from 'react';
import { Textarea } from '@rothko-ui/ui';

const App = () => {
  const [valueS, setValueS] = useState<string>('');
  const [valueM, setValueM] = useState<string>('');
  const [valueL, setValueL] = useState<string>('');

  return (
    <>
      <Textarea
        placeholder="Small"
        size="s"
        value={valueS}
        onChange={e => setValueS(e.currentTarget.value)}
      />
      <Textarea
        placeholder="Medium"
        size="m"
        value={valueM}
        onChange={e => setValueM(e.currentTarget.value)}
      />
      <Textarea
        placeholder="Large"
        size="l"
        value={valueL}
        onChange={e => setValueL(e.currentTarget.value)}
      />
    </>
  );
};

export default App;
