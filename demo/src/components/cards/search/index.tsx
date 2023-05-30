import { Container, Search } from '@rothko-ui/ui';
import { useReducer, useState } from 'react';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import SearchCustomizations, { customizationsReducer } from './Customizations';
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
  const [searchValue, setSearchValue] = useState<string>();
  const isMobileOrTablet = useIsMobileOrTablet();
  const [state, dispatch] = useReducer(customizationsReducer, {
    disabled: false,
    mode: 'popout',
  });

  const { disabled, mode } = state;

  return (
    <Card
      copy={searchCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: searchProps }}
    >
      <Container maxWidth={isMobileOrTablet ? undefined : '26rem'}>
        <Search
          initialQuery={searchValue}
          placeholder={undefined}
          disabled={disabled}
          mode={mode}
          label="Search"
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
          onSearch={q => setSearchValue(q)}
        />
      </Container>
      <Container as="section" maxWidth="26rem">
        <SearchCustomizations state={state} dispatch={dispatch} />
      </Container>
    </Card>
  );
};

export default SearchCard;
