export const BASIC = `
import { Link } from '@rothko-ui/ui';

const App = () => {
  return <Link>Click me</Link>;
};

export default App;
`;
export const UNDERLINE = `
import { Flex, Link } from '@rothko-ui/ui';

const App = () => {
  return (
    <Flex gap="1rem">
      <Link underline="always">Always</Link>
      <Link underline="hover">Hover</Link>
      <Link underline="none">None</Link>
    </Flex>
  );
};

export default App;
`;
export const WITH_KIND = `
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
`;
