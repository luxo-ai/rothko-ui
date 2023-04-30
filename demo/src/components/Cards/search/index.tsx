import { Typography, Search } from '@rothko-ui/ui';
import React from 'react';

const SearchCard = () => {
  return (
    <div className="white-padded-card">
      <Typography.h3>Search</Typography.h3>
      <Search
        // mobile={false}
        dataFetcher={async () => {
          return [
            { id: 1, label: 'One' },
            { id: 2, label: 'Two' },
            { id: 3, label: 'Three' },
          ];
        }}
        onSearch={q => console.log('Query: ', q)}
      />
    </div>
  );
};

export default SearchCard;
