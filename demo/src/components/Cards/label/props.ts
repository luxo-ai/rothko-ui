const labelProps = [
  {
    name: 'to',
    type: 'string',
    defaultValue: null,
    description: 'Sets the link of the item',
  },
  {
    name: 'target',
    type: 'string',
    defaultValue: null,
    description: 'Sets the target of the link',
  },
  {
    name: 'onClick',
    type: 'string',
    defaultValue: null,
    description: 'Sets the onClick of the link',
  },
] as const;

export default labelProps;
