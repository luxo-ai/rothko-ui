const accordionProps = [
  {
    name: 'aria-label',
    type: 'string',
    defaultValue: null,
    description: 'ARIA label for the accordion, providing additional context for accessibility.',
  },
  {
    name: 'bordered',
    type: 'boolean',
    defaultValue: 'false',
    description: 'If `true`, borders are added around each accordion item. Default is `false`.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    defaultValue: null,
    description: 'The content of the accordion, required.',
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
    name: 'iconOverride',
    type: 'React.ReactNode | Accessory<{ open?: boolean }>',
    defaultValue: null,
    description: 'Custom icons for accordion state indicators.',
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
    description: 'If `true`, only one accordion item can be open at a time. Default is `false`.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'Inline styles for the accordion.',
  },
  {
    name: 'withIcon',
    type: 'boolean',
    defaultValue: 'true',
    description: 'If `true`, icons are shown next to items. Default is `true`.',
  },
  {
    name: 'selectedPanelKeys',
    type: 'string[]',
    defaultValue: null,
    description: 'The list of selected panels by key',
  },
  {
    name: 'onPanelChange',
    type: '(isOpen: boolean, panelKey: string) => void',
    defaultValue: null,
    description: 'Callback when a panel is opened or closed.',
  },
] as const;

export default accordionProps;
