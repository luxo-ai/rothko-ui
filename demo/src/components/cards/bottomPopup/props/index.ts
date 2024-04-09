const alertProps = [
  {
    name: 'aria-label',
    type: 'string',
    defaultValue: null,
    description: 'ARIA label for the alert, enhancing accessibility.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    defaultValue: null,
    description: 'The content of the alert.',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name for custom styling.',
  },
  {
    name: 'kind',
    type: 'RothkoKind',
    defaultValue: 'danger',
    description: "Specifies the alert's style kind. Default is 'danger'.",
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'Inline styles for the alert.',
  },
] as const;

export default alertProps;
