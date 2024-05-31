const textareaProps = [
  {
    name: 'error',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Specifies whether there is an error with the input.',
  },
  {
    name: 'variant',
    type: "'bold' | 'italic' | 'light'",
    defaultValue: null,
    description: 'The variant of the input.',
  },
] as const;

export default textareaProps;
