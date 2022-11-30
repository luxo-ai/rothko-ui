import { Alert, Typography } from '@rothko-ui/ui';
import React from 'react';

const AlertCard = () => {
  return (
    <div className="white-padded-card">
      <Typography.h3>Alert</Typography.h3>
      <Alert kind="success">Testing</Alert>
    </div>
  );
};

export default AlertCard;
