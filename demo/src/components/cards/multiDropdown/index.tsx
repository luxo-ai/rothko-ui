import { Container, Dropdown } from '@rothko-ui/ui';
import { useReducer, useState } from 'react';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import MultiDropdownCustomizations, { customizationsReducer } from './Customizations';
import multiDropdownCopy from './copy';
import multiDropdownProps from './props';

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

const multiDropdownOptions = [
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

const MultiDropdownCard = () => {
  const [values, setValues] = useState<number[]>([]);

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
      copy={multiDropdownCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: multiDropdownProps }}
    >
      <Container as="section" maxWidth={isMobileOrTablet ? undefined : '26rem'}>
        <Dropdown
          disabled={disabled}
          closeOnEsc={closeOnEsc}
          menuPosition={menuPosition}
          minimal={minimal}
          placeholder={placeholder}
          selectedPrefix={selectedPrefix}
          multiple
          clearable={clearable}
          label="Mutli Dropdown"
          value={values}
          onChange={v => setValues(v as number[])}
          options={multiDropdownOptions}
        />
      </Container>
      <Container as="section" maxWidth="26rem">
        <MultiDropdownCustomizations state={state} dispatch={dispatch} />
      </Container>
    </Card>
  );
};

export default MultiDropdownCard;
