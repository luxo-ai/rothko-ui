export const BASIC = `
import React, { useState } from 'react';

import { ArrowRightOutline } from '@rothko-ui/icons';
import { Button, Drawer } from '@rothko-ui/ui';

const DRAWER_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        accessoryLeft={({ size, color }) => (
          <ArrowRightOutline width={size} height={size} fill={color} />
        )}
        kind="primary"
        onClick={() => setOpen(true)}
      >
        Open Drawer
      </Button>
      <Drawer blur open={open} onClose={() => setOpen(false)}>
        {DRAWER_CONTENT}
      </Drawer>
    </>
  );
};

export default App;
`;
