import { Container, NestedDropdown } from '@rothko-ui/ui';
import { useReducer, useState } from 'react';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import NestedDropdownCustomizations, { customizationsReducer } from './Customizations';
import nestedDropdownCopy from './copy';
import nestedDropdownProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React, { useState } from 'react';
import { NestedDropdown, NestedOption } from '@rothko-ui/ui';

const Example: React.FC = () => {
  const [value, setValue] = useState<number | null>(null);
  const nestedOptions: NestedOption<number>[] = [...]; // Define your options here

  return (
    <NestedDropdown
      placeholder={placeholder}
      value={value}
      onChange={v => setValue(v)}
      options={nestedOptions}
    />
  );
};
`,
  [CodeLanguage.JS]: `
import React, { useState } from 'react';
import { NestedDropdown, NestedOption } from '@rothko-ui/ui';

const Example = () => {
  const [value, setValue] = useState(null);
  const nestedOptions = [...]; // Define your options here

  return (
    <NestedDropdown
      placeholder={placeholder}
      value={value}
      onChange={v => setValue(v)}
      options={nestedOptions}
    />
  );
};
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
    menuPosition: 'bottom',
    bordered: true,
    placeholder: 'Select an option...',
  });

  const { disabled, clearable, menuPosition, bordered, placeholder } = state;

  return (
    <Card
      copy={nestedDropdownCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: nestedDropdownProps }}
    >
      <Container as="section" maxWidth={isMobileOrTablet ? undefined : '26rem'}>
        <NestedDropdown
          label="Nested Dropdown"
          disabled={disabled}
          placeholder={placeholder}
          menuPosition={menuPosition}
          bordered={bordered}
          clearable={clearable}
          value={value}
          onChange={v => setValue(v)}
          options={nestedOptions}
        />
      </Container>
      <Container as="section" maxWidth="26rem">
        <NestedDropdownCustomizations state={state} dispatch={dispatch} />
      </Container>
    </Card>
  );
};

export default NestedDropdownCard;
