import React from 'react';

import { Button } from '@rothko-ui/ui';

const App = () => {
  return (
    <>
      <Button onClick={() => alert('Primary Clicked!')} kind="primary">
        Primary
      </Button>
      <Button onClick={() => alert('Secondary Clicked!')} kind="secondary">
        Secondary
      </Button>
      <Button onClick={() => alert('Success Clicked!')} kind="success">
        Success
      </Button>
      <Button onClick={() => alert('Info Clicked!')} kind="info">
        Info
      </Button>
      <Button onClick={() => alert('Warning Clicked!')} kind="warning">
        Warning
      </Button>
      <Button onClick={() => alert('Danger Clicked!')} kind="danger">
        Danger
      </Button>
    </>
  );
};

export default App;
