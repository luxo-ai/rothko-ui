import React from 'react';

import { Tag } from '@rothko-ui/components';

const App = () => {
  return (
    <>
      <Tag kind="primary">Primary</Tag>
      <Tag kind="secondary">Secondary</Tag>
      <Tag kind="success">Success</Tag>
      <Tag kind="info">Info</Tag>
      <Tag kind="warning">Warning</Tag>
      <Tag kind="danger">Danger</Tag>
    </>
  );
};

export default App;
