const modalProps = [
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'Class name of the modal',
  },
  {
    name: 'isOpen',
    type: 'boolean',
    defaultValue: null,
    description: 'Indicates whether the modal is open',
  },
  {
    name: 'onClose',
    type: '() => void',
    defaultValue: null,
    description: 'Event handler for closing the modal',
  },
  {
    name: 'size',
    type: 'RothkoSize',
    defaultValue: "'m'",
    description: 'Size of the modal',
  },
  {
    name: 'title',
    type: 'string',
    defaultValue: null,
    description: 'Title of the modal',
  },
] as const;

export default modalProps;
