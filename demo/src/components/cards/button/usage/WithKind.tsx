import React from 'react';

import { Button } from '@rothko-ui/components';

const App = () => {
  return (
    <>
      <Button kind="primary">Primary</Button>
      <Button kind="secondary">Secondary</Button>
      <Button kind="success">Success</Button>
      <Button kind="info">Info</Button>
      <Button kind="warning">Warning</Button>
      <Button kind="danger">Danger</Button>
    </>
  );
};

export default App;
