import React from 'react';

import { Button } from '@rothko-ui/components';
import { Flash, Inbox } from '@rothko-ui/icons';

const App = () => {
  return (
    <>
      <Button
        accessoryLeft={({ size, color }) => <Inbox fill={color} width={size} height={size} />}
      >
        Left Accessory
      </Button>
      <Button
        accessoryRight={({ size, color }) => <Flash fill={color} width={size} height={size} />}
      >
        Right Accessory
      </Button>
    </>
  );
};

export default App;
