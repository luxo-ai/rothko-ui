export const ACCESSORY = `
import React from 'react';

import { Button } from '@rothko-ui/ui';
import { Flash, Inbox } from '@rothko-ui/icons';

const App = () => {
  return (
    <>
      <Button
        accessoryLeft={({ size, color }) => <Inbox fill={color} width={size} height={size} />}
      >
        Left Accessory
      </Button>
      <Button
        accessoryRight={({ size, color }) => <Flash fill={color} width={size} height={size} />}
      >
        Right Accessory
      </Button>
    </>
  );
};

export default App;
`;
export const APPEARANCE = `
import React from 'react';

import { Button } from '@rothko-ui/ui';

const App = () => {
  return (
    <>
      <Button appearance="filled">Filled</Button>
      <Button appearance="outline">Outline</Button>
    </>
  );
};

export default App;
`;
export const DISABLED = `
import React from 'react';

import { Button } from '@rothko-ui/ui';

const App = () => {
  return <Button disabled>Disabled Button</Button>;
};

export default App;
`;
export const LOADING = `
import React from 'react';

import { Button } from '@rothko-ui/ui';

const App = () => {
  return <Button loading>Button</Button>;
};

export default App;
`;
export const SIZE = `
import React from 'react';

import { Button } from '@rothko-ui/ui';

const App = () => {
  return (
    <>
      <Button size="xs">Extra Small</Button>
      <Button size="s">Small</Button>
      <Button size="m">Medium</Button>
      <Button size="l">Large</Button>
    </>
  );
};

export default App;
`;
export const VARIANT = `
import React from 'react';

import { Button } from '@rothko-ui/ui';

const App = () => {
  return (
    <>
      <Button variant="square">Square</Button>
      <Button variant="pill">Pill</Button>
    </>
  );
};

export default App;
`;
export const WITH_KIND = `
import React from 'react';

import { Button } from '@rothko-ui/ui';

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
`;
