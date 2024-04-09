const tabBarProps = [
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'Class name for custom styling',
  },
  {
    name: 'initialTab',
    type: 'Key',
    defaultValue: null,
    description: 'Initial selected tab key',
  },
  {
    name: 'onSelect',
    type: '(tab: Key) => void',
    defaultValue: null,
    description: 'Callback function triggered when a tab is selected',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    defaultValue: null,
    description: 'Inline style object',
  },
  {
    name: 'tabs',
    type: 'ReadonlyArray<Tab<Key>>',
    defaultValue: null,
    description: 'Array of tabs',
  },
  {
    name: 'kind',
    type: 'RothkoKind',
    defaultValue: null,
    description: 'Sets the font and border color semantically',
  },
] as const;

export default tabBarProps;
