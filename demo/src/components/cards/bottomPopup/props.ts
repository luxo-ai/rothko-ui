const bottomPopupProps = [
  {
    name: 'onClose',
    type: '() => void',
    defaultValue: null,
    description: 'Callback function to close the popup',
  },
  {
    name: 'open',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Sets the popup to open',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'Adds a class to the component',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'Adds a style to the component',
  },
] as const;

export default bottomPopupProps;
