import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import React from 'react';
import ModalCard from '../../components/Cards/modal';
import NavigationList from '../../components/NavigationList';

const Modal = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <ModalCard />
    </Grid>
  );
};

export default Modal;
