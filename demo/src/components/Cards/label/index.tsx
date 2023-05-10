import { ExpandableLabel, Label, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const LabelCard = () => {
  const [checked2, setChecked2] = useState(false);

  return (
    <div className="white-padded-card">
      <Typography.h3>Label</Typography.h3>

      <Label>Testing</Label>
      <ExpandableLabel label="A label">Testing Expandable</ExpandableLabel>
    </div>
  );
};

export default LabelCard;
