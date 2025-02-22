import { Alert } from '@rothko-ui/react';
import React from 'react';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
      <Alert variant="outline" kind="success">
        Success
      </Alert>
      <Alert variant="outline" kind="warning">
        Warning
      </Alert>
      <Alert variant="outline" kind="danger">
        Error!
      </Alert>
    </div>
  );
};

export default App;
