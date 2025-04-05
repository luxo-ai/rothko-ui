const radioProps = [
  {
    name: 'className',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'CSS class name(s).',
  },
  {
    name: '$key',
    type: 'string',
    defaultValue: null,
    description: 'The key of the radio.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the radio group.',
  },
] as const;

export default radioProps;
