export const BASIC = `
import React, { useState } from 'react';
import { Textarea } from '@rothko-ui/ui';

const App = () => {
  const [value, setValue] = useState<string>('');

  return <Textarea value={value} onChange={e => setValue(e.currentTarget.value)} />;
};

export default App;
`;
export const DISABLED = `
import React from 'react';
import { Textarea } from '@rothko-ui/ui';

const App = () => {
  return <Textarea placeholder="Disabled" disabled />;
};

export default App;
`;
export const SIZE = `
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
`;
export const VARIANT = `
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
`;
