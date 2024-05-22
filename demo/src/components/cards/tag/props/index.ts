const tagProps = [
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'Additional class name for the tag.',
  },
  {
    name: 'appearance',
    type: "'filled' | 'outline'",
    defaultValue: null,
    description: 'Appearance style of the tag',
  },
  {
    name: 'onClose',
    type: '() => void',
    defaultValue: null,
    description: 'Callback function triggered when the tag is closed',
  },
  {
    name: 'kind',
    type: 'RothkoKind',
    defaultValue: null,
    description: 'Sets the font and border color semantically',
  },
  {
    name: 'id',
    type: 'string',
    defaultValue: null,
    description: 'Unique identifier for the tag.',
  },
  {
    name: 'role',
    type: 'React.AriaRole',
    defaultValue: null,
    description: 'The role of the tag.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    defaultValue: null,
    description: 'Custom styles for the tag.',
  },
] as const;

export default tagProps;
