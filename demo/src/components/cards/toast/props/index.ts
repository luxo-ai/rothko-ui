const toastProps = [
  {
    name: 'content',
    type: 'React.ReactNode',
    defaultValue: null,
    description: 'The content of the toast',
  },
  {
    name: 'duration',
    type: 'number',
    defaultValue: null,
    description: 'The duration of the toast in milliseconds',
  },
  {
    name: 'kind',
    type: 'RothkoKind',
    defaultValue: null,
    description: 'Sets the font and border color semantically',
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    defaultValue: null,
    description: 'The label of the toast',
  },
  {
    name: 'withLife',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether the toast has a life cycle',
  },
] as const;

export default toastProps;
