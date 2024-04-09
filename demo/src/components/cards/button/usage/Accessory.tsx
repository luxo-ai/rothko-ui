import React from 'react';

import { Button } from '@rothko-ui/ui';
import { Flash, Inbox } from '@rothko-ui/icons';

const App = () => {
  return (
    <>
      <Button
        onClick={() => alert('Left Accessory Button Clicked!')}
        accessoryLeft={({ size, color }) => <Inbox fill={color} width={size} height={size} />}
      >
        Left Accessory
      </Button>
      <Button
        onClick={() => alert('Right Acccessory Button Clicked!')}
        accessoryRight={({ size, color }) => <Flash fill={color} width={size} height={size} />}
      >
        Right Accessory
      </Button>
    </>
  );
};

export default App;
