const typographyProps = [
  {
    name: 'light',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Sets the font type to light',
  },
  {
    name: 'bold',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Sets the font type to bold',
  },
  {
    name: 'italic',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Sets the font type to italic',
  },
  {
    name: 'kind',
    type: 'RothkoKind',
    defaultValue: null,
    description: 'Sets the font color',
  },
] as const;

export default typographyProps;
