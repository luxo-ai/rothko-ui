import React from 'react';

import { Button, useToaster } from '@rothko-ui/components';

const TOAST_DURATION = 4000;

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
