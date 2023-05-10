import { Avatar, Typography } from '@rothko-ui/ui';
import React from 'react';

const AvatarCard = () => {
  return (
    <div className="white-padded-card">
      <Typography.h3>Avatar</Typography.h3>
      <Avatar url="/assets/dog.png" />
    </div>
  );
};

export default AvatarCard;
