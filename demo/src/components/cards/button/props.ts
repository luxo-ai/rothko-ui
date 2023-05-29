const buttonProps = [
  {
    name: 'kind',
    type: 'RothkoKind',
    defaultValue: 'primary',
    description: 'The semantic kind of the button',
  },
  {
    name: 'appearance',
    type: 'ButtonAppearance',
    defaultValue: 'filled',
    description: 'Does the button appear filled or outlined',
  },
  {
    name: 'size',
    type: 'RothkoSize',
    defaultValue: 'm',
    description: 'Button size',
  },
  {
    name: 'accessoryLeft',
    type: 'Accessory',
    defaultValue: null,
    description: 'Render an accessory to the left of the button content',
  },
  {
    name: 'accessoryRight',
    type: 'Accessory',
    defaultValue: null,
    description: 'Render an accessory to the right of the button content',
  },
  {
    name: 'shape',
    type: 'ButtonShape',
    defaultValue: null,
    description: 'The button shape',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: null,
    description: 'Is content loading from this target',
  },
  {
    name: 'fitContent',
    type: 'boolean',
    defaultValue: null,
    description: 'Make the width fit the button content',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'Adds a class to the component',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: null,
    description: 'Disables the button',
  },
  {
    name: 'onClick',
    type: '(e: HTMLButtonEvent) => void',
    defaultValue: null,
    description: 'Button click event handler',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'Adds a style to the component',
  },
] as const;

export default buttonProps;
