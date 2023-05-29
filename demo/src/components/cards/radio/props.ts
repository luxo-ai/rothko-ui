const radioProps = [
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'Adds a class to the radio component',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: null,
    description: 'Disables the radio',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: null,
    description: 'Indicates an error state for the radio',
  },
  {
    name: 'kind',
    type: 'RothkoKind',
    defaultValue: null,
    description: 'Sets the font and border color semantically',
  },
  {
    name: 'onSelect',
    type: '() => void',
    defaultValue: null,
    description: 'Callback function invoked when the radio is selected',
  },
  {
    name: 'selected',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies if the radio is selected',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    defaultValue: null,
    description: 'Adds custom styles to the radio component',
  },
] as const;

export default radioProps;
