/* eslint-disable no-console */
import { Tag, Typography } from '@rothko-ui/ui';
import React from 'react';

const TagCard = () => {
  return (
    <div className="white-padded-card">
      <Typography.h3 style={{ marginBottom: '1rem' }}>Tag</Typography.h3>
      <div className="accordion-container">
        <Tag
          onClose={() => {
            console.log('ayo');
          }}
          appearance="filled"
          kind="success"
        >
          my first tag
        </Tag>
      </div>
    </div>
  );
};

export default TagCard;
