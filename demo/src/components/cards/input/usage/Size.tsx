import React, { useState } from 'react';
import { Input } from '@rothko-ui/ui';

const App = () => {
  const [valueS, setValueS] = useState<string>('');
  const [valueM, setValueM] = useState<string>('');
  const [valueL, setValueL] = useState<string>('');

  return (
    <>
      <Input
        placeholder="Email"
        size="s"
        value={valueS}
        onChange={e => setValueS(e.currentTarget.value)}
      />
      <Input
        placeholder="Email"
        size="m"
        value={valueM}
        onChange={e => setValueM(e.currentTarget.value)}
      />
      <Input
        placeholder="Email"
        size="l"
        value={valueL}
        onChange={e => setValueL(e.currentTarget.value)}
      />
    </>
  );
};

export default App;
