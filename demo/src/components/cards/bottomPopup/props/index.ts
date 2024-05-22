const popupProps = [
  {
    name: 'blur',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Determines whether the popup should blur the background.',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'The CSS class name for the popup.',
  },
  {
    name: 'id',
    type: 'string',
    defaultValue: null,
    description: 'Unique identifier for the popup.',
  },
  {
    name: 'onClose',
    type: '() => void',
    defaultValue: null,
    description: 'Callback function to be called when the popup is closed.',
  },
  {
    name: 'open',
    type: 'boolean',
    defaultValue: null,
    description: 'Determines whether the popup is open or closed.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    defaultValue: null,
    description: 'The inline style for the popup.',
  },
] as const;

export default popupProps;
