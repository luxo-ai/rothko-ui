import { Flash, Inbox } from '@rothko-ui/icons';
import { Button } from '@rothko-ui/react';
import React from 'react';

const App = () => {
  return (
    <>
      <Button
        kind="info"
        accessoryLeft={({ size }) => <Inbox fill="currentColor" width={size} height={size} />}
      >
        Left Accessory
      </Button>
      <Button
        accessoryRight={({ size }) => <Flash fill="currentColor" width={size} height={size} />}
      >
        Right Accessory
      </Button>
    </>
  );
};

export default App;
