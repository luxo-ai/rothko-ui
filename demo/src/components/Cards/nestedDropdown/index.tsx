import { NestedDropdown, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const NestedDropdownCard = () => {
  const [singleVal, setSingleVal] = useState<string | null>(null);

  return (
    <div className="white-padded-card">
      <Typography.h3>NestedDropdown</Typography.h3>
      <NestedDropdown value={singleVal} onChange={v => setSingleVal(v)} options={nestedOptions} />
    </div>
  );
};

const nestedOptions = [
  {
    id: '0',
    label: 'Sub',
    subcategories: [
      {
        id: '01',
        label: 'Sub-One',
      },
      {
        id: '02',
        label: 'Sub-Two',
      },
      { id: '03', label: 'Sub-Three' },
    ],
  },
  {
    id: '1',
    label: 'Two',
  },
  {
    id: '2',
    label: 'Three',
  },
];

export default NestedDropdownCard;
