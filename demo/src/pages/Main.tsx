import { Grid } from '@rothko-ui/ui';
import React from 'react';
import NavigationList from '../components/NavigationList';

const Main = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(200px, 400px) 1fr">
      <NavigationList />
      <div>testing</div>
    </Grid>
  );
};

export default Main;
