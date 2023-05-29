const drawerProps = [
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'Adds a class to the component',
  },
  {
    name: 'isOpen',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether the drawer is open',
  },
  {
    name: 'onClose',
    type: '() => void',
    defaultValue: null,
    description: 'Drawer close event handler',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'Adds a style to the component',
  },
] as const;

export default drawerProps;
