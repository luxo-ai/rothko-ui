import { BreadCrumbItem, BreadCrumbs, Typography } from '@rothko-ui/ui';
import { noop } from 'lodash';
import React from 'react';

const BreadCrumbsCard = () => {
  return (
    <div className="white-padded-card">
      <Typography.h3>Bread Crumbs</Typography.h3>
      <div className="accordion-container">
        <BreadCrumbs>
          <BreadCrumbItem to="ok">One</BreadCrumbItem>
          <BreadCrumbItem onClick={noop}>Two</BreadCrumbItem>
          <BreadCrumbItem>Three</BreadCrumbItem>
        </BreadCrumbs>
      </div>
    </div>
  );
};

export default BreadCrumbsCard;
