import React from 'react';

import { Button } from '@rothko-ui/ui';

const App = () => {
  return (
    <>
      <Button onClick={() => alert('Filled Clicked!')} appearance="filled">
        Filled
      </Button>
      <Button onClick={() => alert('Outline Clicked!')} appearance="outline">
        Outline
      </Button>
    </>
  );
};

export default App;
