const toggleProps = [
  {
    name: 'children',
    type: 'string',
    defaultValue: null,
    description: 'The content of the switch',
  },
  {
    name: 'className',
    type: 'React.ReactNode',
    defaultValue: null,
    description: 'Adds a class to the switch',
  },
  {
    name: 'onChange',
    type: '(selected: boolean) => void',
    defaultValue: null,
    description: 'Event handler for switch state change',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    defaultValue: null,
    description: 'Inline style for the switch',
  },
  {
    name: 'selected',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies if the switch is selected or not',
  },
  {
    name: 'onIcon',
    type: 'JSX.Element',
    defaultValue: null,
    description: 'Icon to display when the switch is on',
  },
  {
    name: 'offIcon',
    type: 'JSX.Element',
    defaultValue: null,
    description: 'Icon to display when the switch is off',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: null,
    description: 'Disables the checkbox',
  },
] as const;

export default toggleProps;
