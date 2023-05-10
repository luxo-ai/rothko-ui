/* eslint-disable no-console */
import { Button, Typography, useToaster } from '@rothko-ui/ui';
import React from 'react';

const ToastCard = () => {
  const t = useToaster();
  return (
    <div className="white-padded-card">
      <Typography.h3 style={{ marginBottom: '1rem' }}>Toast</Typography.h3>
      <div className="accordion-container">
        <div className="accordion-container">
          <Button onClick={() => t.addToast({ content: 'Hello' })}>Click me</Button>
        </div>
      </div>
    </div>
  );
};

export default ToastCard;
