const breadCrumbItemProps = [
  {
    name: 'children',
    type: 'string',
    defaultValue: null,
    description: 'The text content of the breadcrumb item.',
  },
  {
    name: 'onClick',
    type: '() => void',
    defaultValue: null,
    description: 'Optional callback function invoked when the breadcrumb item is clicked.',
  },
  {
    name: 'target',
    type: 'string',
    defaultValue: null,
    description: 'Optional target attribute for the breadcrumb link.',
  },
  {
    name: 'to',
    type: 'string',
    defaultValue: null,
    description: 'Optional URL to navigate to when the breadcrumb item is clicked.',
  },
] as const;

export default breadCrumbItemProps;
