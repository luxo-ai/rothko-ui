const tabProps = [
  {
    name: '$key',
    type: 'string',
    defaultValue: null,
    description: 'The key of the tab',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the tab',
  },
  {
    name: 'children',
    type: 'ReactNode',
    defaultValue: null,
    description: 'The content of the tab',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name(s)',
  },
  {
    name: 'title',
    type: 'string',
    defaultValue: null,
    description: 'The title of the tab',
  },
  {
    name: 'leftIcon',
    type: 'ReactElement',
    defaultValue: null,
    description: 'The icon to display on the left side of the tab',
  },
  {
    name: 'rightIcon',
    type: 'ReactElement',
    defaultValue: null,
    description: 'The icon to display on the right side of the tab',
  },
] as const;

export default tabProps;
