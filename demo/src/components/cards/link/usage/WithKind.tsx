import React from 'react';

import { Flex, Link } from '@rothko-ui/ui';

const App = () => {
  return (
    <Flex gap="1rem" flexWrap="wrap">
      <Link kind="primary">Primary</Link>
      <Link kind="secondary">Secondary</Link>
      <Link kind="success">Success</Link>
      <Link kind="info">Info</Link>
      <Link kind="warning">Warning</Link>
      <Link kind="danger">Danger</Link>
    </Flex>
  );
};

export default App;
