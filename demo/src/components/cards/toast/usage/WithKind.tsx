import React from 'react';

import type { RothkoKind } from '@rothko-ui/components';
import { Button, useToaster } from '@rothko-ui/components';

const TOAST_DURATION = 4000;

const App = (props: { kind: RothkoKind }) => {
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
