import React, { Alert } from '@rothko-ui/components';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
      <Alert kind="success">Success</Alert>
      <Alert kind="warning">Warning</Alert>
      <Alert kind="danger">Error!</Alert>
    </div>
  );
};

export default App;
