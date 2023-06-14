const nestedDropdownProps = [
  {
    name: 'value',
    type: 'V | null',
    defaultValue: null,
    description: 'Current value of dropdown or value array if multiple',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: "'Select'",
    description: 'Placeholder in input',
  },
  {
    name: 'options',
    type: 'NestedOption<V>[]',
    defaultValue: null,
    description: 'Dropdown options',
  },
  {
    name: 'onChange',
    type: '(v: V | null) => void',
    defaultValue: null,
    description: 'Event handler for value change',
  },
  {
    name: 'onBlur',
    type: '(e: FocusEvent) => void',
    defaultValue: null,
    description: 'OnBlur handler',
  },
  {
    name: 'onOpen',
    type: '() => void',
    defaultValue: null,
    description: 'OnOpen handler',
  },
  {
    name: 'onFocus',
    type: '(e: FocusEvent) => void',
    defaultValue: null,
    description: 'OnFocus handler',
  },

  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: null,
    description: 'Is the dropdown disabled',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: null,
    description: 'Did an error occur. Alert user when true',
  },
  {
    name: 'renderOption',
    type: 'RenderOption<V, { hasMore: boolean }>',
    defaultValue: null,
    description: 'Custom method for rendering option',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'Class names of outer wrapper',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: null,
    description: 'If the dropdown has a label',
  },
  {
    name: 'bordered',
    type: 'boolean',
    defaultValue: true,
    description: 'Is this a minimal dropdown',
  },
] as const;

export default nestedDropdownProps;
