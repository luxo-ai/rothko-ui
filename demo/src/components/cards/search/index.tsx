import { Search } from '@rothko-ui/ui';
import React, { useState } from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import searchCopy from './copy';
import searchProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
  import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <BreadCrumbs>
        <BreadCrumbItem to="ok">One</BreadCrumbItem>
        <BreadCrumbItem onClick={() => console.log('two clicked!')}>Two</BreadCrumbItem>
        <BreadCrumbItem>Three</BreadCrumbItem>
      </BreadCrumbs> 
    );
  }
`,
  [CodeLanguage.JS]: `
  import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <BreadCrumbs>
        <BreadCrumbItem to="ok">One</BreadCrumbItem>
        <BreadCrumbItem onClick={() => console.log('two clicked!')}>Two</BreadCrumbItem>
        <BreadCrumbItem>Three</BreadCrumbItem>
      </BreadCrumbs> 
    );
  }
`,
};

const SearchCard = () => {
  const [idk, setIdk] = useState('');
  return (
    <Card
      copy={searchCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: searchProps, description: searchCopy.description }}
    >
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
    </Card>
  );
};

export default SearchCard;
