export const BASIC = `
import { Tag } from '@rothko-ui/react';
import React from 'react';

const App = () => {
  return (
    <Tag variant="filled" kind="danger">
      example tag
    </Tag>
  );
};

export default App;
`;
export const CLOSEABLE = `
import { Tag } from '@rothko-ui/react';
import React from 'react';

const App = () => {
  return <Tag onClose={() => alert('Closed!')}>closeable tag</Tag>;
};

export default App;
`;
export const VARIANT = `
import { Tag } from '@rothko-ui/react';
import React from 'react';

const App = () => {
  return (
    <>
      <Tag variant="outline">outline tag</Tag>
      <Tag variant="filled">filled tag</Tag>
    </>
  );
};

export default App;
`;
export const WITH_KIND = `
import { Tag } from '@rothko-ui/react';
import React from 'react';

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
