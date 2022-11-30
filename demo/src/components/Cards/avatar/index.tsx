import { Alert, Avatar, Typography } from '@rothko-ui/ui';
import React from 'react';

const AvatarCard = () => {
  return (
    <div className="white-padded-card">
      <Typography.h3>Avatar</Typography.h3>
      <Avatar name="Jim Spot" url="/assets/dog.png" />
    </div>
  );
};

export default AvatarCard;
