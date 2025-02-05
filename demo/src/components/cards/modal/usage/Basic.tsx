import React, { useState } from 'react';

import { Button, Modal } from '@rothko-ui/components';

const CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Aliquam id diam maecenas ultricies mi eget.';

const TITLE = 'Modal Title';

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal size="m" title={TITLE} open={open} onClose={() => setOpen(false)}>
        {CONTENT}
      </Modal>
    </>
  );
};

export default App;
