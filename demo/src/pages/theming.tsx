import { Typography } from '@rothko-ui/ui';
import React from 'react';
import WithNavigation from '../components/WithNavigation';

const Theming = () => {
  return (
    <WithNavigation selected="theming">
      <Typography.h1>Todo</Typography.h1>
    </WithNavigation>
  );
};

export default Theming;
