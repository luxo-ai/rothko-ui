const accordionPanelProps = [
  {
    name: '$key',
    type: 'string',
    defaultValue: null,
    description: 'The key for the panel.',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name(s).',
  },
  {
    name: 'classNames',
    type: 'Object<StyleableComponents, string>',
    defaultValue: null,
    description: 'CSS class name(s) for the panel components.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'The inline styles for the panel components.',
  },
  {
    name: 'icon',
    type: 'Icon',
    defaultValue: null,
    description: ' The icon for the panel.',
  },
  {
    name: 'onClick',
    type: '(e: MouseEvent) => void',
    defaultValue: null,
    description: 'Event handler for the click event on the panel..',
  },
  {
    name: 'onKeyDown',
    type: '(e: KeyboardEvent) => void',
    defaultValue: null,
    description: ' Event handler for the keydown event on the panel.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the panel.',
  },
  {
    name: 'styles',
    type: 'Object<StyleableComponents, React.CSSProperties>',
    defaultValue: null,
    description: 'The inline styles for the panel components.',
  },
  {
    name: 'subtitle',
    type: 'ReactNode',
    defaultValue: null,
    description: 'The subtitle of the panel.',
  },
  {
    name: 'title',
    type: 'ReactNode',
    defaultValue: null,
    description: 'The title of the panel.',
  },
] as const;

export default accordionPanelProps;
