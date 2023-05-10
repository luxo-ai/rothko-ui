/* eslint-disable no-console */
import { Toggle, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const ToggleCard = () => {
  const [singleVal, setSingleVal] = useState<boolean>(false);

  return (
    <div className="white-padded-card">
      <Typography.h3 style={{ marginBottom: '1rem' }}>Toggle</Typography.h3>
      <div className="accordion-container">
        <div className="accordion-container">
          <Toggle kind="success" toggled={singleVal} onChange={v => setSingleVal(v)} />
        </div>
      </div>
    </div>
  );
};

export default ToggleCard;
