import React from 'react';
import ToastCard from '../../components/ccards/toast';
import WithNavigation from '../../components/WithNavigation';

const Toast = () => {
  return (
    <WithNavigation selected="components/toast">
      <ToastCard />
    </WithNavigation>
  );
};

export default Toast;
