import { Checkbox, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const CheckboxCard = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  return (
    <div className="white-padded-card">
      <Typography.h3>Checkbox</Typography.h3>
      <Checkbox style={{ marginBottom: 18 }} checked={checked1} onChange={v => setChecked1(v)} />
      <Checkbox withCheck kind="info" checked={checked2} onChange={v => setChecked2(v)}>
        Hello world
      </Checkbox>
    </div>
  );
};

export default CheckboxCard;
