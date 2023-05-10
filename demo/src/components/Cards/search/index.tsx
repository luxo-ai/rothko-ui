import { Search, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const SearchCard = () => {
  const [idk, setIdk] = useState('');
  return (
    <div className="white-padded-card">
      <Typography.h3 style={{ marginBottom: '1rem' }}>Search</Typography.h3>
      <div className="accordion-container">
        <Search
          initialQuery={idk}
          placeholder={undefined}
          mode="popout"
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
      </div>
    </div>
  );
};

export default SearchCard;
