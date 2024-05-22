const accordionProps = [
  {
    name: 'bordered',
    type: 'boolean',
    defaultValue: 'false',
    description: 'If `true`, borders are added around each accordion item. Default is `false`.',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name for custom styling.',
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Adds spacing around items for better separation. Default is `false`.',
  },
  {
    name: 'icon',
    type: 'Icon',
    defaultValue: null,
    description: 'Custom icons for accordion state indicators.',
  },
  {
    name: 'id',
    type: 'string',
    defaultValue: null,
    description: 'Unique identifier for the accordion.',
  },
  {
    name: 'kind',
    type: 'RothkoKind',
    defaultValue: null,
    description: "Specifies the accordion's style kind.",
  },
  {
    name: 'multiple',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'If `true`, multiple accordion items can be open at the same time. Default is `false`.',
  },
  {
    name: 'noIcon',
    type: 'boolean',
    defaultValue: 'false',
    description: 'If `true`, icons are not shown next to items. Default is `false`.',
  },
  {
    name: 'onPanelChange',
    type: '(isOpen: boolean, panelKey: string) => void',
    defaultValue: null,
    description: 'Callback when a panel is opened or closed.',
  },
  {
    name: 'selectedKeys',
    type: 'string[]',
    defaultValue: '[]',
    description: 'The list of selected panels by key.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'Inline styles for the accordion.',
  },
] as const;

export default accordionProps;
