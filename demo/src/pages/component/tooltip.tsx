import { Grid, ToastContextProvider, WidthGeqOnly } from '@rothko-ui/ui';
import TooltipCard from '../../components/Cards/tooltip';
import NavigationList from '../../components/NavigationList';
import React from 'react';

const Tooltip = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <ToastContextProvider>
        <TooltipCard />
      </ToastContextProvider>
    </Grid>
  );
};

export default Tooltip;
