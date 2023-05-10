import { Slider, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const SliderCard = () => {
  const [a, setA] = useState('');
  const [idk, setIdk] = useState('');
  const [v, setV] = useState(0);
  const [b, setB] = useState<[number, number]>([0, 10]);
  const [selectedValue, setSelectedValue] = useState<number[]>([]);
  return (
    <div className="white-padded-card">
      <Typography.h3 style={{ marginBottom: '1rem' }}>Slider</Typography.h3>
      <div className="accordion-container">
        <Slider kind="success" value={v} onChange={setV} max={100} />
      </div>
    </div>
  );
};

export default SliderCard;
