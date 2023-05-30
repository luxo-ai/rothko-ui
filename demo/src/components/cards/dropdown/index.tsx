import { Container, Dropdown } from '@rothko-ui/ui';
import { useReducer, useState } from 'react';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import DropdownCustomizations, { customizationsReducer } from './Customizations';
import dropdownCopy from './copy';
import dropdownProps from './props';

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

const dropdownOptions = [
  {
    id: 0,
    label: 'Zero',
  },
  {
    id: 1,
    label: 'One',
  },
  {
    id: 2,
    label: 'Two',
  },
];

const SingleDropdownCard = () => {
  const [selected, setSelected] = useState<number>();
  const isMobileOrTablet = useIsMobileOrTablet();
  const [state, dispatch] = useReducer(customizationsReducer, {
    disabled: false,
    clearable: false,
    closeOnEsc: true,
    search: false,
    menuPosition: 'bottom',
    minimal: false,
    placeholder: 'Select an option...',
  });

  const {
    disabled,
    clearable,
    closeOnEsc,
    search,
    menuPosition,
    minimal,
    selectedPrefix,
    placeholder,
  } = state;

  return (
    <Card
      copy={dropdownCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: dropdownProps }}
    >
      <Container as="section" maxWidth={isMobileOrTablet ? undefined : '26rem'}>
        <Dropdown
          clearable={clearable}
          closeOnEsc={closeOnEsc}
          disabled={disabled}
          menuPosition={menuPosition}
          minimal={minimal}
          placeholder={placeholder}
          search={search}
          selectedPrefix={selectedPrefix}
          label="Dropdown"
          value={selected}
          onChange={v => setSelected(v as number)}
          options={dropdownOptions}
        />
      </Container>
      <Container as="section" maxWidth="26rem">
        <DropdownCustomizations state={state} dispatch={dispatch} />
      </Container>
    </Card>
  );
};

export default SingleDropdownCard;
