import { MultiSlider, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const MultiSliderCard = () => {
  const [selectedValue, setSelectedValue] = useState<number[]>([]);
  const [b, setB] = useState<[number, number]>([0, 10]);
  return (
    <div className="white-padded-card">
      <Typography.h3>MultiSlider</Typography.h3>
      <MultiSlider label="testing" value={b} onChange={v1 => setB(v1)} max={100} />
    </div>
  );
};

export default MultiSliderCard;
