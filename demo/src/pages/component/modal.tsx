import React from 'react';
import ModalCard from '../../components/Cards/modal';
import WithNavigation from '../../components/WithNavigation';

const Modal = () => {
  return (
    <WithNavigation selected="components/modal">
      <ModalCard />
    </WithNavigation>
  );
};

export default Modal;
