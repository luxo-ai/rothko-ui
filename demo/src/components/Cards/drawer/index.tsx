import { Button, Drawer, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const DrawerCard = () => {
  const [checked2, setChecked2] = useState(false);

  return (
    <div className="white-padded-card">
      <Typography.h3>Drawer</Typography.h3>
      <Button kind="secondary" onClick={() => setChecked2(true)}>
        Open Drawer
      </Button>
      <Drawer isOpen={checked2} onClose={() => setChecked2(false)}>
        <Typography.body>Hello world</Typography.body>
      </Drawer>
    </div>
  );
};

export default DrawerCard;
