const buttonProps = [
  {
    name: 'aria-label',
    type: 'string',
    defaultValue: null,
    description: 'The ARIA label for the button.',
  },
  {
    name: 'aria-controls',
    type: 'string',
    defaultValue: null,
    description: 'ID of the element(s) that the button controls.',
  },
  {
    name: 'aria-expanded',
    type: 'boolean',
    defaultValue: null,
    description: 'Indicates whether the controlled element is expanded or collapsed.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Determines if the button is disabled. Default is false.',
  },
  {
    name: 'onClick',
    type: '(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void',
    defaultValue: null,
    description: 'Click event handler.',
  },
  {
    name: 'onKeyDown',
    type: '(event: React.KeyboardEvent<HTMLButtonElement>) => void',
    defaultValue: null,
    description: 'Keydown event handler.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    defaultValue: null,
    description: 'The content of the button.',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name for custom styling.',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Is content loading from this target. Default is false.',
  },
  {
    name: 'fitContent',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Make the width fit the button content. Default is false.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    defaultValue: null,
    description: 'Inline styles for the button.',
  },
  {
    name: 'kind',
    type: 'RothkoKind',
    defaultValue: 'primary',
    description: "The semantic kind of the button. Default is 'primary'.",
  },
  {
    name: 'appearance',
    type: "'filled' | 'outline'",
    defaultValue: 'filled',
    description: "Does the button appear filled or outlined. Default is 'filled'.",
  },
  {
    name: 'size',
    type: 'RothkoSize',
    defaultValue: 'm',
    description: "Button size. Default is 'm'.",
  },
  {
    name: 'accessoryLeft',
    type: 'Accessory',
    defaultValue: null,
    description: 'Render an accessory to the left of the button content.',
  },
  {
    name: 'accessoryRight',
    type: 'Accessory',
    defaultValue: null,
    description: 'Render an accessory to the right of the button content.',
  },
  {
    name: 'shape',
    type: "'pill' | 'square'",
    defaultValue: null,
    description: 'The button shape.',
  },
  {
    name: 'tabIndex',
    type: 'number',
    defaultValue: null,
    description: 'Tab index of the button.',
  },
  {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    defaultValue: 'button',
    description: "Type of the button. Default is 'button'.",
  },
] as const;

export default buttonProps;
