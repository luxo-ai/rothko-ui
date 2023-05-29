const toggleProps = [
  {
    name: 'children',
    type: 'React.ReactNode',
    defaultValue: null,
    description: 'The content of the toggle',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'Adds a class to the toggle',
  },
  {
    name: 'onChange',
    type: '(toggled: boolean) => void',
    defaultValue: null,
    description: 'Event handler for toggle state change',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    defaultValue: null,
    description: 'Inline style for the toggle',
  },
  {
    name: 'toggled',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies if the toggle is toggled or not',
  },
  {
    name: 'onIcon',
    type: 'JSX.Element',
    defaultValue: null,
    description: 'Icon to display when the toggle is on',
  },
  {
    name: 'offIcon',
    type: 'JSX.Element',
    defaultValue: null,
    description: 'Icon to display when the toggle is off',
  },
] as const;

export default toggleProps;
