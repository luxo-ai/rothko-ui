export const BASIC = `
import { ArrowUpOutline } from '@rothko-ui/icons';
import { Popup, Button } from '@rothko-ui/react';
import React, { useState } from 'react';

const POPUP_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        accessoryLeft={({ size }) => <ArrowUpOutline width={size} height={size} />}
        onClick={() => setOpen(true)}
      >
        Open
      </Button>
      <Popup open={open} onClose={() => setOpen(false)}>
        {POPUP_CONTENT}
      </Popup>
    </>
  );
};

export default App;
`;
export const VARIANT = `
import { ArrowUpOutline } from '@rothko-ui/icons';
import { Popup, Button } from '@rothko-ui/react';
import React, { useState } from 'react';

const POPUP_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        accessoryLeft={({ size }) => <ArrowUpOutline width={size} height={size} />}
        onClick={() => setOpen(true)}
      >
        Open
      </Button>
      <Popup variant="none" open={open} onClose={() => setOpen(false)}>
        {POPUP_CONTENT}
      </Popup>
    </>
  );
};

export default App;
`;
