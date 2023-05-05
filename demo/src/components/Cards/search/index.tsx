import { Typography, Search, Input, Slider, MultiSlider } from '@rothko-ui/ui';
import React, { useState } from 'react';

const SearchCard = () => {
  const [a, setA] = useState('');
  const [idk, setIdk] = useState('');
  const [v, setV] = useState(0);
  const [b, setB] = useState<[number, number]>([0, 10]);
  return (
    <div className="white-padded-card">
      <Typography.h3 style={{ marginBottom: '1rem' }}>Search</Typography.h3>
      <div className="accordion-container">
        <Input value={a} onChange={v => setA(v.currentTarget.value)} />
        <Search
          initialQuery={idk}
          placeholder={undefined}
          // mode="popout"
          label="testing"
          dataFetcher={async () => {
            return [
              { id: 1, label: 'One' },
              { id: 2, label: 'Two' },
              { id: 3, label: 'Three' },
              { id: 4, label: 'Four' },
              { id: 5, label: 'Five' },
              { id: 6, label: 'Six' },
              { id: 7, label: 'Seven' },
              { id: 8, label: 'Eight' },
            ];
          }}
          onSearch={q => setIdk(q)}
        />
        <Slider value={v} onChange={setV} max={100} />
        <MultiSlider label="testing" value={b} onChange={v1 => setB(v1)} max={100} />
      </div>
    </div>
  );
};

export default SearchCard;
