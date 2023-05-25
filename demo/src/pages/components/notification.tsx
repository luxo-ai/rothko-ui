import React from 'react';
import NotificationCard from '../../components/Cards/notification';
import WithNavigation from '../../components/WithNavigation';

const Notification = () => {
  return (
    <WithNavigation selected="components/notification">
      <NotificationCard />
    </WithNavigation>
  );
};

export default Notification;
