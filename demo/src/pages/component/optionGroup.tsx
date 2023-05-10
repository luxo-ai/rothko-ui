import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import OptionGroupCard from '../../components/Cards/optionGroup';
import NavigationList from '../../components/NavigationList';
import React from 'react';

const OptionGroup = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <OptionGroupCard />
    </Grid>
  );
};

export default OptionGroup;
