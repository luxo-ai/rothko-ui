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
    <MultiDropdown
      clearable
      menuPosition="bottom"
      values={values}
      onChange={v => setValues(v)}
      options={multiDropdownOptions}
    />
  );
};
`,
  [CodeLanguage.JS]: `
import React, { useState } from 'react';
import { Dropdown } from '@rothko-ui/ui';

const Example = () => {
  const [values, setValues] = useState(null);
  const multiDropdownOptions = [...]; // Define your options here

  return (
    <MultiDropdown
      clearable
      menuPosition="bottom"
      values={values}
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
  const [values, setValues] = useState<number[] | null>([]);

  const isMobileOrTablet = useIsMobileOrTablet();

  const [state, dispatch] = useReducer(customizationsReducer, {
    disabled: false,
    clearable: false,
    menuPosition: 'bottom',
    bordered: true,
    placeholder: 'Select an option...',
  });

  const {
    disabled,
    clearable,
    menuPosition,
    bordered,
    selectedPrefix,
    selectedPostfix,
    placeholder,
  } = state;

  return (
    <Card
      copy={multiDropdownCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: multiDropdownProps }}
    >
      <Container as="section" maxWidth={isMobileOrTablet ? undefined : '26rem'}>
        <MultiDropdown
          disabled={disabled}
          menuPosition={menuPosition}
          bordered={bordered}
          placeholder={placeholder}
          selectedPrefix={selectedPrefix}
          selectedPostfix={selectedPostfix}
          clearable={clearable}
          label="Mutli Dropdown"
          values={values}
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
