import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import NotificationCard from '../../components/Cards/notification';
import NavigationList from '../../components/Navigation/NavigationList';
import React from 'react';

const Notification = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <NotificationCard />
    </Grid>
  );
};

export default Notification;
