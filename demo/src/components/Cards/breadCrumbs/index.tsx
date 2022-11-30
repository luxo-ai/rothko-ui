import {
  BottomPopup,
  BreadCrumbItem,
  BreadCrumbs,
  Button,
  Dropdown,
  Typography,
} from '@rothko-ui/ui';
import { useState } from 'react';
import React from 'react';

const BreadCrumbsCard = () => {
  return (
    <div className="white-padded-card">
      <Typography.h3>Bread Crumbs</Typography.h3>
      <div className="accordion-container">
        <BreadCrumbs>
          <BreadCrumbItem to="ok">One</BreadCrumbItem>
          <BreadCrumbItem onClick={() => console.log('ok')}>Two</BreadCrumbItem>
          <BreadCrumbItem>Three</BreadCrumbItem>
        </BreadCrumbs>
      </div>
    </div>
  );
};

export default BreadCrumbsCard;
