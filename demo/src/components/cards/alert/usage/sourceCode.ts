export const BASIC = `
import React, { Alert } from '@rothko-ui/react';

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
`;
export const VARIANT = `
import React, { Alert } from '@rothko-ui/react';

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
`;
