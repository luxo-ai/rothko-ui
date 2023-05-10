import { Dropdown, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const SingleDropdownCard = () => {
  const [selectedValue, setSelectedValue] = useState<number[]>([]);
  return (
    <div className="white-padded-card">
      <Typography.h3 style={{ marginBottom: '1rem' }}>Single Dropdown</Typography.h3>
      <div className="accordion-container">
        <Dropdown
          clearable
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
