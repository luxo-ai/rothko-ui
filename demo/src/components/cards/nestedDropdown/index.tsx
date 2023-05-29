import { Container, MaxWidth, NestedDropdown } from '@rothko-ui/ui';
import { useReducer, useState } from 'react';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import NestedDropdownCustomizations, { customizationsReducer } from './Customizations';
import nestedDropdownCopy from './copy';
import nestedDropdownProps from './props';

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

const nestedOptions = [
  {
    id: '0',
    label: 'Sub',
    subcategories: [
      {
        id: '01',
        label: 'Sub-One',
      },
      {
        id: '02',
        label: 'Sub-Two',
      },
      { id: '03', label: 'Sub-Three' },
    ],
  },
  {
    id: '1',
    label: 'Two',
  },
  {
    id: '2',
    label: 'Three',
  },
];

const NestedDropdownCard = () => {
  const [value, setValue] = useState<string | null>(null);
  const isMobileOrTablet = useIsMobileOrTablet();
  const [state, dispatch] = useReducer(customizationsReducer, {
    disabled: false,
    clearable: false,
    closeOnEsc: true,
    menuPosition: 'bottom',
    minimal: false,
    placeholder: 'Select an option...',
  });

  const { disabled, clearable, closeOnEsc, menuPosition, minimal, selectedPrefix, placeholder } =
    state;

  return (
    <Card
      copy={nestedDropdownCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: nestedDropdownProps, description: nestedDropdownCopy.description }}
    >
      <MaxWidth maxW="26rem">
        <NestedDropdownCustomizations state={state} dispatch={dispatch} />
      </MaxWidth>
      <Container maxWidth={isMobileOrTablet ? undefined : '26rem'} marginTop="2rem">
        <NestedDropdown
          label="Nested Dropdown"
          disabled={disabled}
          closeOnEsc={closeOnEsc}
          placeholder={placeholder}
          // menuPosition={menuPosition}
          // minimal={minimal}
          // clearable={clearable}
          // selectedPrefix={selectedPrefix}
          value={value}
          onChange={v => setValue(v)}
          options={nestedOptions}
        />
      </Container>
    </Card>
  );
};

export default NestedDropdownCard;
