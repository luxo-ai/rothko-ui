export const ACCESSORY = `
import React from 'react';

import { Button } from '@rothko-ui/ui';
import { Flash, Inbox } from '@rothko-ui/icons';

const App = () => {
  return (
    <>
      <Button
        onClick={() => alert('Left Accessory Button Clicked!')}
        accessoryLeft={({ size, color }) => <Inbox fill={color} width={size} height={size} />}
      >
        Left Accessory
      </Button>
      <Button
        onClick={() => alert('Right Acccessory Button Clicked!')}
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
      <Button onClick={() => alert('Filled Clicked!')} appearance="filled">
        Filled
      </Button>
      <Button onClick={() => alert('Outline Clicked!')} appearance="outline">
        Outline
      </Button>
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
export const SHAPE = `
import React from 'react';

import { Button } from '@rothko-ui/ui';

const App = () => {
  return (
    <>
      <Button onClick={() => alert('Square Clicked!')} shape="square">
        Square
      </Button>
      <Button onClick={() => alert('Pill Clicked!')} shape="pill">
        Pill
      </Button>
    </>
  );
};

export default App;
`;
export const SIZE = `
import React from 'react';

import { Button } from '@rothko-ui/ui';

const App = () => {
  return (
    <>
      <Button onClick={() => alert('Extra Small Clicked!')} size="xs">
        Extra Small
      </Button>
      <Button onClick={() => alert('Small Clicked!')} size="s">
        Small
      </Button>
      <Button onClick={() => alert('Medium Clicked!')} size="m">
        Medium
      </Button>
      <Button onClick={() => alert('Large Clicked!')} size="l">
        Large
      </Button>
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
      <Button onClick={() => alert('Primary Clicked!')} kind="primary">
        Primary
      </Button>
      <Button onClick={() => alert('Secondary Clicked!')} kind="secondary">
        Secondary
      </Button>
      <Button onClick={() => alert('Success Clicked!')} kind="success">
        Success
      </Button>
      <Button onClick={() => alert('Info Clicked!')} kind="info">
        Info
      </Button>
      <Button onClick={() => alert('Warning Clicked!')} kind="warning">
        Warning
      </Button>
      <Button onClick={() => alert('Danger Clicked!')} kind="danger">
        Danger
      </Button>
    </>
  );
};

export default App;
`;
