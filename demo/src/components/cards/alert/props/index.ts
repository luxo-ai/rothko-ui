const alertProps = [
  {
    name: 'appearance',
    type: "'filled' | 'outline'",
    defaultValue: "'filled'",
    description: 'The appearance style of the Alert component. Default is "filled".',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'The class name for the Alert component.',
  },
  {
    name: 'id',
    type: 'string',
    defaultValue: null,
    description: 'Unique identifier for the Alert component.',
  },
  {
    name: 'kind',
    type: 'RothkoKind',
    defaultValue: "'danger'",
    description: "Specifies the alert's style kind. Default is 'danger'.",
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the Alert component.',
  },
] as const;

export default alertProps;
