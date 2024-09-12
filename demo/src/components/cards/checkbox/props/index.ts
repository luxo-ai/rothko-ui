const checkboxProps = [
  {
    name: 'checked',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether the checkbox is checked.',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'The CSS class name for the checkbox.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether the checkbox is disabled.',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether there is an error with the checkbox.',
  },
  {
    name: 'errorText',
    type: 'string',
    defaultValue: 'Invalid',
    description: 'The error text to be displayed when there is an error.',
  },
  {
    name: 'id',
    type: 'string',
    defaultValue: null,
    description: 'Unique identifier for the checkbox.',
  },
  {
    name: 'kind',
    type: 'RothkoKind',
    defaultValue: null,
    description: 'The visual style of the checkbox.',
  },
  {
    name: 'onChange',
    type: '(v: boolean) => void',
    defaultValue: null,
    description: 'The callback function called when the checkbox value changes.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether the checkbox is required.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    defaultValue: null,
    description: 'The inline style for the checkbox.',
  },
] as const;

export default checkboxProps;
