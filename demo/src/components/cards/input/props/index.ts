const inputProps = [
  {
    name: 'error',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Specifies whether there is an error with the input.',
  },
  {
    name: 'size',
    type: 'InputSize',
    defaultValue: "'m'",
    description: 'The size of the input.',
  },
  {
    name: 'variant',
    type: "'bold' | 'italic' | 'light'",
    defaultValue: null,
    description: 'The variant of the input.',
  },
] as const;

export default inputProps;
