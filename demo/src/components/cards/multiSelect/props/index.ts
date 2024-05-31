const multiDropdownProps = [
  {
    name: 'value',
    type: 'V | V[] | null',
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
    type: 'Option<V, T>[]',
    defaultValue: null,
    description: 'Dropdown options',
  },
  {
    name: 'onChange',
    type: '(v: V | V[] | null) => void',
    defaultValue: null,
    description: 'Event handler for value change',
  },
  {
    name: 'onOpen',
    type: '() => void',
    defaultValue: null,
    description: 'OnOpen handler',
  },
  {
    name: 'onBlur',
    type: '(e: FocusEvent) => void',
    defaultValue: null,
    description: 'OnBlur handler',
  },
  {
    name: 'onFocus',
    type: '(e: FocusEvent) => void',
    defaultValue: null,
    description: 'OnFocus handler',
  },
  {
    name: 'onDelete',
    type: '(v: V) => void',
    defaultValue: null,
    description: 'Callback triggered on deletion',
  },
  {
    name: 'clearable',
    type: 'boolean',
    defaultValue: null,
    description: 'Can you clear the selection',
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
    type: 'RenderOption<V, T>',
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
    name: 'menuPosition',
    type: "'top' | 'bottom' | 'auto'",
    defaultValue: "'bottom'",
    description: 'Open dropdown position',
  },
  {
    name: 'bordered',
    type: 'boolean',
    defaultValue: true,
    description: 'Is this a minimal dropdown',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    defaultValue: null,
    description: 'Adds a style to the component',
  },
] as const;

export default multiDropdownProps;
