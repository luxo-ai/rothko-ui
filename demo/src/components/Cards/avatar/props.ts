const avatarProps = [
  {
    name: 'url',
    type: 'string',
    defaultValue: null,
    description: 'Sets the image url',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'Adds a class to the component',
  },
  {
    name: 'name',
    type: 'string',
    defaultValue: null,
    description: 'Sets the name of the image',
  },
  {
    name: 'size',
    type: 'RemSize',
    defaultValue: null,
    description: 'Sets the size of the image in rem',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'Adds a style to the component',
  },
] as const;

export default avatarProps;
