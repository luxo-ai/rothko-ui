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
import React, { useState } from 'react';
import { Dropdown, Option } from '@rothko-ui/ui';

const Example: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const dropdownOptions: Option<number>[] = [...]; // Define your options here

  return (
    <Dropdown
      clearable
      search
      menuPosition="top"
      value={selected}
      onChange={v => setSelected(v as number)}
      options={dropdownOptions}
    />
  );
}

export default Example;
`,
  [CodeLanguage.JS]: `
import React, { useState } from 'react';
import { Dropdown } from '@rothko-ui/ui';

const Example = () => {
  const [selected, setSelected] = useState(null);
  const dropdownOptions = [...]; // Define your options here

  return (
    <Dropdown
      clearable
      search
      menuPosition="top"
      value={selected}
      onChange={v => setSelected(v)}
      options={dropdownOptions}
    />
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
  const [selected, setSelected] = useState<number | null>(null);
  const isMobileOrTablet = useIsMobileOrTablet();
  const [state, dispatch] = useReducer(customizationsReducer, {
    disabled: false,
    clearable: false,
    search: false,
    menuPosition: 'bottom',
    bordered: true,
    placeholder: 'Select an option...',
  });

  const {
    disabled,
    clearable,
    search,
    menuPosition,
    bordered,
    selectedPrefix,
    selectedPostfix,
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
          disabled={disabled}
          menuPosition={menuPosition}
          bordered={bordered}
          placeholder={placeholder}
          search={search}
          selectedPrefix={selectedPrefix}
          selectedPostfix={selectedPostfix}
          label="Dropdown"
          value={selected}
          onChange={v => setSelected(v)}
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
