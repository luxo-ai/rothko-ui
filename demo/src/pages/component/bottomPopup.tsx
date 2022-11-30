import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import AlertCard from '../../components/Cards/alert';
import NavigationList from '../../components/NavigationList';
import React from 'react';
import AvatarCard from '../../components/Cards/avatar';
import BottomPopupCard from '../../components/Cards/bottomPopup';

const BottomPopup = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <BottomPopupCard />
    </Grid>
  );
};

export default BottomPopup;
