const buttonProps = [
  {
    name: 'accessoryLeft',
    type: 'Accessory',
    defaultValue: null,
    description: 'The left accessory component.',
  },
  {
    name: 'accessoryRight',
    type: 'Accessory',
    defaultValue: null,
    description: 'The right accessory component.',
  },
  {
    name: 'appearance',
    type: "'filled' | 'outline'",
    defaultValue: 'filled',
    description: 'The appearance style of the button.',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'The class name for styling purposes.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: null,
    description: 'Whether the button is disabled.',
  },
  {
    name: 'fitContent',
    type: 'boolean',
    defaultValue: null,
    description: 'Whether the button should fit its content.',
  },
  {
    name: 'id',
    type: 'string',
    defaultValue: null,
    description: 'Unique identifier for the button.',
  },
  {
    name: 'kind',
    type: 'RothkoKind',
    defaultValue: 'primary',
    description: 'The kind of button.',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: null,
    description: 'Whether the button is in a loading state.',
  },
  {
    name: 'onClick',
    type: '(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void',
    defaultValue: null,
    description: 'The click event handler.',
  },
  {
    name: 'onKeyDown',
    type: '(e: React.KeyboardEvent<HTMLButtonElement>) => void',
    defaultValue: null,
    description: 'The keydown event handler.',
  },
  {
    name: 'role',
    type: 'React.AriaRole',
    defaultValue: 'button',
    description: 'The role of the button.',
  },
  {
    name: 'size',
    type: 'RothkoSize',
    defaultValue: 'm',
    description: 'The size of the button.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    defaultValue: null,
    description: 'The inline style for the button.',
  },
  {
    name: 'tabIndex',
    type: 'number',
    defaultValue: null,
    description: 'The tab index of the button.',
  },
  {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    defaultValue: 'button',
    description: 'The type of the button.',
  },
  {
    name: 'variant',
    type: "'square' | 'pill' | 'default'",
    defaultValue: 'default',
    description: 'The variant of the button.',
  },
] as const;

export default buttonProps;
