export const ACCESSORY = `
import React from 'react';

import { Button } from '@rothko-ui/components';
import { Flash, Inbox } from '@rothko-ui/icons';

const App = () => {
  return (
    <>
      <Button
        kind="info"
        accessoryLeft={({ size }) => <Inbox fill="currentColor" width={size} height={size} />}
      >
        Left Accessory
      </Button>
      <Button
        accessoryRight={({ size }) => <Flash fill="currentColor" width={size} height={size} />}
      >
        Right Accessory
      </Button>
    </>
  );
};

export default App;
`;
export const DISABLED = `
import React from 'react';

import { Button } from '@rothko-ui/components';

const App = () => {
  return <Button disabled>Disabled Button</Button>;
};

export default App;
`;
export const LOADING = `
import React, { useEffect, useState } from 'react';

import { Button } from '@rothko-ui/components';

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => setLoading(false), 4000);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  return (
    <Button onClick={() => setLoading(true)} loading={loading}>
      Click to load...
    </Button>
  );
};

export default App;
`;
export const RADIUS = `
import React from 'react';

import { Button } from '@rothko-ui/components';

const App = () => {
  return (
    <>
      <Button radius="none">None</Button>
      <Button radius="default">Default</Button>
      <Button radius="full">Full</Button>
    </>
  );
};

export default App;
`;
export const SIZE = `
import React from 'react';

import { Button } from '@rothko-ui/components';

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

import { Button } from '@rothko-ui/components';

const App = () => {
  return (
    <>
      <Button variant="filled">Filled</Button>
      <Button variant="outline">Outline</Button>
    </>
  );
};

export default App;
`;
export const WITH_KIND = `
import React from 'react';

import { Button } from '@rothko-ui/components';

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
