import React from 'react';

import { Button } from '@rothko-ui/ui';

const App = () => {
  return (
    <>
      <Button onClick={() => alert('Extra Small Clicked!')} size="xs">
        Extra Small
      </Button>
      <Button onClick={() => alert('Small Clicked!')} size="s">
        Small
      </Button>
      <Button onClick={() => alert('Medium Clicked!')} size="m">
        Medium
      </Button>
      <Button onClick={() => alert('Large Clicked!')} size="l">
        Large
      </Button>
    </>
  );
};

export default App;
