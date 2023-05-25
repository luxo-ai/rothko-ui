import React from 'react';
import ToastCard from '../../components/cards/toast';
import WithNavigation from '../../components/WithNavigation';

const Toast = () => {
  return (
    <WithNavigation selected="components/toast">
      <ToastCard />
    </WithNavigation>
  );
};

export default Toast;
