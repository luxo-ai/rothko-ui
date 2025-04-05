const breadCrumbsProps = [
  {
    name: 'children',
    type: 'ReactNode',
    defaultValue: null,
    description: 'Breadcrumb items to be displayed.',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name(s).',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    defaultValue: null,
    description: 'Inline style for the breadcrumbs.',
  },
] as const;

export default breadCrumbsProps;
