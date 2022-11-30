import {
  BackLinkButton,
  BottomPopup,
  BreadCrumbItem,
  BreadCrumbs,
  Button,
  Checkbox,
  Dropdown,
  Typography,
} from '@rothko-ui/ui';
import { useState } from 'react';
import React from 'react';

const CheckboxCard = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  return (
    <div className="white-padded-card">
      <Typography.h3>Checkbox</Typography.h3>
      <Checkbox
        style={{ marginBottom: 18 }}
        checked={checked1}
        onChange={() => setChecked1(!checked1)}
      />
      <Checkbox withCheck kind="info" checked={checked2} onChange={() => setChecked2(!checked2)}>
        Hello world
      </Checkbox>
    </div>
  );
};

export default CheckboxCard;
