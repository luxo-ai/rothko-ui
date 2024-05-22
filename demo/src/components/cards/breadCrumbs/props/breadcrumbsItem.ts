const breadcrumbItemProps = [
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'The class name for the breadcrumb item.',
  },
  {
    name: 'id',
    type: 'string',
    defaultValue: null,
    description: 'Unique identifier for the breadcrumb item.',
  },
  {
    name: 'onClick',
    type: '() => void',
    defaultValue: null,
    description: 'The function to be called when the breadcrumb item is clicked.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    defaultValue: null,
    description: 'The style for the breadcrumb item.',
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
