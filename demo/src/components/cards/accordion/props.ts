const accordionProps = [
  {
    name: 'bordered',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Adds a border around the component',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'Adds a class to the component',
  },
  {
    name: 'kind',
    type: 'RothkoKind',
    defaultValue: null,
    description: 'Sets the font and border color semantically',
  },
  {
    name: 'mutuallyExclusive',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Prevents multiple cards from being open at the same time',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'Adds a style to the component',
  },
  {
    name: 'iconOverride',
    type: 'React.ReactNode | Accessory<{ open?: boolean }>',
    defaultValue: null,
    description: 'Overrides the default icon',
  },
] as const;

export default accordionProps;
