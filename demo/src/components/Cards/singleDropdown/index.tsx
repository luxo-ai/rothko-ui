import { Dropdown, Input, Typography } from '@rothko-ui/ui';
import { useState } from 'react';
import React from 'react';

const SingleDropdownCard = () => {
  const [a, setA] = useState('');
  const [selectedValue, setSelectedValue] = useState<number[]>([]);
  return (
    <div className="white-padded-card">
      <Typography.h3 style={{ marginBottom: '1rem' }}>Single Dropdown</Typography.h3>
      <div className="accordion-container">
        <Input value={a} onChange={v => setA(v.currentTarget.value)} />

        <Dropdown
          multiple
          clearable
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
