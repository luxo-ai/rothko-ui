const tagProps = [
  {
    name: 'appearance',
    type: 'TagAppearance',
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
] as const;

export default tagProps;
