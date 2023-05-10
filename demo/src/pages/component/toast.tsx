import { Grid, ToastContextProvider, WidthGeqOnly } from '@rothko-ui/ui';
import React from 'react';
import ToastCard from '../../components/Cards/toast';
import NavigationList from '../../components/NavigationList';

const Toast = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <ToastContextProvider>
        <ToastCard />
      </ToastContextProvider>
    </Grid>
  );
};

export default Toast;
