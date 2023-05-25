import React from 'react';
import AlertCard from '../../components/Cards/alert';
import WithNavigation from '../../components/WithNavigation';

const Alert = () => {
  return (
    <WithNavigation selected="components/alert">
      <AlertCard />
    </WithNavigation>
  );
};

export default Alert;