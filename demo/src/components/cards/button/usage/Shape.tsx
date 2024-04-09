import React from 'react';

import { Button } from '@rothko-ui/ui';

const App = () => {
  return (
    <>
      <Button onClick={() => alert('Square Clicked!')} shape="square">
        Square
      </Button>
      <Button onClick={() => alert('Pill Clicked!')} shape="pill">
        Pill
      </Button>
    </>
  );
};

export default App;
