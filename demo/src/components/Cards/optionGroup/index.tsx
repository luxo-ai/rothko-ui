import { OptionGroup, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const OptionGroupCard = () => {
  const [b, setB] = useState<[number, number]>([0, 10]);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  return (
    <div className="white-padded-card">
      <Typography.h3>Option Group</Typography.h3>
      <OptionGroup
        fillRemainingSpace
        value={selectedValue}
        onChange={v => setSelectedValue(v)}
        kind="primary"
        maxRow={1}
        maxCol={2}
        options={[
          { id: 1, label: 'One' },
          { id: 2, label: 'Two' },
          { id: 3, label: 'Three', data: { disabled: true } },
        ]}
      />
    </div>
  );
};

export default OptionGroupCard;
