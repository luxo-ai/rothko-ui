const checkboxProps = [
  {
    name: 'checked',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether the checkbox is checked',
  },
  {
    name: 'children',
    type: 'string',
    defaultValue: null,
    description: 'Content to be rendered beside the checkbox',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'Adds a class to the component',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether the checkbox has an error state',
  },
  {
    name: 'kind',
    type: 'RothkoKind',
    defaultValue: null,
    description: 'The semantic kind of the checkbox',
  },
  {
    name: 'onChange',
    type: '(val: boolean) => void',
    defaultValue: null,
    description: 'Checkbox change event handler',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'Adds a style to the component',
  },
  {
    name: 'withCheck',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether the checkbox should display the checkmark',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: null,
    description: 'Disables the checkbox',
  },
] as const;

export default checkboxProps;
