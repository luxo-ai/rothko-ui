import { Grid, Typography, WidthGeqOnly } from '@rothko-ui/ui';
import React from 'react';
import NavigationList from '../components/Navigation/NavigationList';

const Theming = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <Typography.h1>Todo</Typography.h1>
    </Grid>
  );
};

export default Theming;
