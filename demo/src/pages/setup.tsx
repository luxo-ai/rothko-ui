import { Typography } from '@rothko-ui/ui';
import React from 'react';
import WithNavigation from '../components/WithNavigation';

const Setup = () => {
  return (
    <WithNavigation selected="/setup">
      <Typography.h1>Todo</Typography.h1>
    </WithNavigation>
  );
};

export default Setup;
