import { BottomPopup, Button, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const BottomPopupCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="white-padded-card">
      <Typography.h3>Bottom Popup</Typography.h3>
      <Button onClick={() => setIsOpen(true)}>Open popup</Button>
      <BottomPopup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Typography.body>Hello world</Typography.body>
      </BottomPopup>
    </div>
  );
};

export default BottomPopupCard;
