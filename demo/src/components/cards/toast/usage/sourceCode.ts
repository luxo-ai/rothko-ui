export const BASIC = `
import { Button, useToaster } from '@rothko-ui/react';
import React from 'react';

const TOAST_DURATION = 40000000;

const App = () => {
  const toaster = useToaster();

  const handleClick = () => {
    toaster.addToast({
      content: 'This is a toast message',
      label: 'Alert!',
      duration: TOAST_DURATION,
    });
  };

  return <Button onClick={handleClick}>Click me</Button>;
};

export default App;
`;
export const WITH_KIND = `
import { Button, useToaster } from '@rothko-ui/react';
import React from 'react';

const TOAST_DURATION = 4000;

const App = () => {
  const toaster = useToaster();

  const handleClick = () => {
    toaster.addToast({
      content: 'This is a toast message',
      label: 'Alert!',
      kind: props.kind,
      duration: TOAST_DURATION,
    });
  };

  return <Button onClick={handleClick}>Click me</Button>;
};

export default App;
`;
export const WITH_LIFE = `
import { Button, useToaster } from '@rothko-ui/react';
import React from 'react';

const TOAST_DURATION = 4000;

const App = () => {
  const toaster = useToaster();

  const handleClick = () => {
    toaster.addToast({
      content: 'This is a toast message',
      label: 'Alert!',
      withLife: true,
      duration: TOAST_DURATION,
    });
  };

  return <Button onClick={handleClick}>Click me</Button>;
};

export default App;
`;
