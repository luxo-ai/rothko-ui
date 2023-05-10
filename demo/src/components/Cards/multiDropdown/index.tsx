import { Button, Dropdown, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const MultiDropdownCard = () => {
  const [selectedValue, setSelectedValue] = useState<number[]>([]);
  return (
    <div className="white-padded-card">
      <Typography.h3>MultiDropdown</Typography.h3>
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
    </div>
  );
};

export default MultiDropdownCard;
