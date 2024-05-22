import React, { useState } from 'react';
import { ArrowUpOutline } from '@rothko-ui/icons';
import { BottomPopup, Button } from '@rothko-ui/ui';

const POPUP_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        accessoryLeft={({ size, color }) => (
          <ArrowUpOutline width={size} height={size} fill={color} />
        )}
        onClick={() => setOpen(true)}
      >
        Open
      </Button>
      <BottomPopup open={open} onClose={() => setOpen(false)}>
        {POPUP_CONTENT}
      </BottomPopup>
    </>
  );
};

export default App;
