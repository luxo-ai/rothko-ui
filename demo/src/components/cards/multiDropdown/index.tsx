import { Container, MultiDropdown } from '@rothko-ui/ui';
import { useReducer, useState } from 'react';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import MultiDropdownCustomizations, { customizationsReducer } from './Customizations';
import multiDropdownCopy from './copy';
import multiDropdownProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React, { useState } from 'react';
import { Dropdown, Option } from '@rothko-ui/ui';

const Example: React.FC = () => {
  const [values, setValues] = useState<number[] | null>(null);
  const multiDropdownOptions: Option<number>[] = [...]; // Define your options here

  return (
    <Dropdown
      clearable
      search
      menuPosition="bottom"
      multiple
      value={values}
      onChange={v => setValues(v as number[])}
      options={multiDropdownOptions}
    />
  );
};
`,
  [CodeLanguage.JS]: `
import React, { useState } from 'react';
import { Dropdown } from '@rothko-ui/ui';

const Example = () => {
  const [values, setValues] = useState([]);
  const multiDropdownOptions = [...]; // Define your options here

  return (
    <Dropdown
      clearable
      search
      menuPosition="bottom"
      multiple
      value={values}
      onChange={v => setValues(v)}
      options={multiDropdownOptions}
    />
  );
};
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
        <MultiDropdown
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
          onChange={v => setValues(v)}
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
