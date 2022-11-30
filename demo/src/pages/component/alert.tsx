import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import AlertCard from '../../components/Cards/alert';
import NavigationList from '../../components/NavigationList';
import React from 'react';

const Alert = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <AlertCard />
    </Grid>
  );
};

export default Alert;
