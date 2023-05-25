import React from 'react';
import AvatarCard from '../../components/Cards/avatar';
import WithNavigation from '../../components/WithNavigation';

const Avatar = () => {
  return (
    <WithNavigation selected="components/avatar">
      <AvatarCard />
    </WithNavigation>
  );
};

export default Avatar;
