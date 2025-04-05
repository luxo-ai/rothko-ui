const breadcrumbItemProps = [
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name(s).',
  },
  {
    name: 'onClick',
    type: '() => void',
    defaultValue: null,
    description: 'onClick handler for the breadcrumb item.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'Inline style for the breadcrumb item.',
  },
  {
    name: 'target',
    type: 'string',
    defaultValue: null,
    description: 'The target of the breadcrumb item link.',
  },
  {
    name: 'to',
    type: 'string',
    defaultValue: null,
    description: 'The URL to navigate to when the breadcrumb item is clicked.',
  },
] as const;

export default breadcrumbItemProps;
