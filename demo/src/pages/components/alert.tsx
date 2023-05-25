import React from 'react';
import AlertCard from '../../components/cards/alert';
import WithNavigation from '../../components/WithNavigation';

const Alert = () => {
  return (
    <WithNavigation selected="components/alert">
      <AlertCard />
    </WithNavigation>
  );
};

export default Alert;
