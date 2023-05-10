import { Input, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const InputCard = () => {
  const [value, setValue] = useState<string>('');

  return (
    <div className="white-padded-card">
      <Typography.h3>Input</Typography.h3>
      <Input value={value} onChange={e => setValue(e.currentTarget.value)} />
    </div>
  );
};

export default InputCard;
