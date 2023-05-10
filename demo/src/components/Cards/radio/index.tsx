import { Radio, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const RadioCard = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div className="white-padded-card">
      <Typography.h3>Radio</Typography.h3>
      <Radio
        selected={selected}
        onChange={v => {
          console.log('hello', v);
          setSelected(v);
        }}
      >
        Hello world
      </Radio>
    </div>
  );
};

export default RadioCard;
