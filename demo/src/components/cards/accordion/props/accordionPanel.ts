const accordionPanelProps = [
  {
    name: 'aria-label',
    type: 'string',
    defaultValue: null,
    description: 'ARIA label for the accordion panel, enhancing accessibility.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    defaultValue: null,
    description: 'Content of the accordion panel, required.',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class for custom styling of the panel container.',
  },
  {
    name: 'contentClassName',
    type: 'string',
    defaultValue: null,
    description: 'CSS class for custom styling of the panel content area.',
  },
  {
    name: 'contentStyle',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'Inline styles for the panel content area.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'If `true`, the panel is disabled and cannot be interacted with.',
  },
  {
    name: 'iconOverride',
    type: 'React.ReactNode | Accessory<{ open?: boolean }>',
    defaultValue: null,
    description: 'Custom icons for the accordion state indicators, overriding default icons.',
  },
  {
    name: 'labelClassName',
    type: 'string',
    defaultValue: null,
    description: 'CSS class for custom styling of the panel label.',
  },
  {
    name: 'labelStyle',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'Inline styles for the panel label.',
  },
  {
    name: 'onClick',
    type: '(e: React.MouseEvent<HTMLButtonElement>) => void',
    defaultValue: null,
    description: 'Callback function triggered on click events.',
  },
  {
    name: 'panelKey',
    type: 'React.Key',
    defaultValue: null,
    description:
      'Unique key for identifying the panel, necessary for managing open state in a collection.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'Inline styles for the panel container.',
  },
  {
    name: 'subtitle',
    type: 'string | JSX.Element',
    defaultValue: null,
    description: 'Subtitle content for the panel, can be a string or JSX element.',
  },
  {
    name: 'title',
    type: 'string | JSX.Element',
    defaultValue: null,
    description: 'Title content for the panel, required, can be a string or JSX element.',
  },
] as const;

export default accordionPanelProps;
