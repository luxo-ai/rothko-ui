const drawerProps = [
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'The CSS class name for the Drawer.',
  },
  {
    name: 'id',
    type: 'string',
    defaultValue: null,
    description: 'Unique identifier for the Drawer.',
  },
  {
    name: 'onClose',
    type: '() => void',
    defaultValue: null,
    description: 'Callback function called when the Drawer is closed.',
  },
  {
    name: 'open',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Determines whether the Drawer is open or closed.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    defaultValue: null,
    description: 'The inline style for the Drawer.',
  },
  {
    name: 'blur',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Determines whether the Drawer is blurred.',
  },
] as const;

export default drawerProps;
