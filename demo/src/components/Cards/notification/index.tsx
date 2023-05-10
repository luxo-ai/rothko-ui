import { Bell } from '@rothko-ui/icons';
import { Notification, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const NotificationCard = () => {
  const [selectedValue, setSelectedValue] = useState<number[]>([]);
  const [b, setB] = useState<[number, number]>([0, 10]);
  return (
    <div className="white-padded-card">
      <Typography.h3>Notification</Typography.h3>
      <Notification color="success" size={10} count={400} maxCount={40}>
        <Bell width={24} height={24} />
      </Notification>
    </div>
  );
};

export default NotificationCard;
