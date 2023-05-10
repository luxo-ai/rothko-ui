import {
  Typography,
  Search,
  Input,
  Slider,
  MultiSlider,
  ToastContextProvider,
  Button,
  useToaster,
  WithToolip,
} from '@rothko-ui/ui';
import React, { useState } from 'react';

const TooltipCard = () => {
  const [a, setA] = useState('');
  const [idk, setIdk] = useState('');
  const [v, setV] = useState(0);
  const [b, setB] = useState<[number, number]>([0, 10]);
  const t = useToaster();
  return (
    <div className="white-padded-card">
      <WithToolip text="hello world!">
        <Typography.h3 style={{ marginBottom: '1rem' }}>Tooltip</Typography.h3>
      </WithToolip>

      <div className="accordion-container">
        <Button onClick={() => t.addToast({ content: 'Hello' })}>Click me</Button>
      </div>
    </div>
  );
};

export default TooltipCard;
