export const APPEARANCE = `
import React from 'react';

import { Tag } from '@rothko-ui/ui';

const App = () => {
  return (
    <>
      <Tag appearance="outline">outline tag</Tag>
      <Tag appearance="filled">filled tag</Tag>
    </>
  );
};

export default App;
`;
export const BASIC = `
import React from 'react';

import { Tag } from '@rothko-ui/ui';

const App = () => {
  return (
    <Tag appearance="filled" kind="danger">
      example tag
    </Tag>
  );
};

export default App;
`;
export const CLOSEABLE = `
import React from 'react';

import { Tag } from '@rothko-ui/ui';

const App = () => {
  return <Tag onClose={() => alert('Closed!')}>closeable tag</Tag>;
};

export default App;
`;
export const WITH_KIND = `
import React from 'react';

import { Tag } from '@rothko-ui/ui';

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
`;
