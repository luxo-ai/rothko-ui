const breadCrumbsProps = [
  {
    name: 'children',
    type: 'React.ReactNode',
    defaultValue: null,
    description: 'The content to be displayed as the children of the BreadCrumbs component.',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'The class name for the BreadCrumbs component.',
  },
  {
    name: 'id',
    type: 'string',
    defaultValue: null,
    description: 'Unique identifier for the BreadCrumbs component.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    defaultValue: null,
    description: 'The style for the BreadCrumbs component.',
  },
] as const;

export default breadCrumbsProps;
