import { BottomPopup, Button, Dropdown, Typography } from '@rothko-ui/ui';
import { useState } from 'react';
import React from 'react';

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
