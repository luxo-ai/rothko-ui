import { Button, Modal, Typography } from '@rothko-ui/ui';
import React from 'react';

const ModalCard = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="white-padded-card">
      <Typography.h3>Modal</Typography.h3>
      <Button onClick={() => setOpen(true)}>open modal</Button>
      <Modal title="Testing" isOpen={open} onClose={() => setOpen(false)}>
        <Typography.body>Modal</Typography.body>
      </Modal>
    </div>
  );
};

export default ModalCard;
