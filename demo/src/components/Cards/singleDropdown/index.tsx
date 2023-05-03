import { Dropdown, Typography } from '@rothko-ui/ui';
import { useState } from 'react';
import React from 'react';

const SingleDropdownCard = () => {
  const [selectedValue, setSelectedValue] = useState<number[]>([]);
  return (
    <div className="white-padded-card">
      <Typography.h3 style={{ marginBottom: '1rem' }}>Single Dropdown</Typography.h3>
      <div className="accordion-container">
        <Dropdown
          //  multiple
          label="Testing"
          value={selectedValue}
          onChange={v => setSelectedValue(v as number[])}
          options={[
            {
              id: 0,
              label: 'Zero',
            },
            {
              id: 1,
              label: 'One',
            },
            {
              id: 2,
              label: 'Two',
            },
          ]}
        />
        <Dropdown
          //  multiple
          search
          label="Testing"
          value={selectedValue}
          onChange={v => setSelectedValue(v as number[])}
          options={[
            {
              id: 0,
              label: 'Zero',
            },
            {
              id: 1,
              label: 'One',
            },
            {
              id: 2,
              label: 'Two',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default SingleDropdownCard;
