const sliderProps = [
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'Class name for custom styling',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: null,
    description: 'Disables the slider',
  },
  {
    name: 'kind',
    type: 'RothkoKind',
    defaultValue: null,
    description: 'Sets the font and border color semantically',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: null,
    description: 'Label for the slider',
  },
  {
    name: 'max',
    type: 'number',
    defaultValue: null,
    description: 'Maximum value of the slider',
  },
  {
    name: 'maxWidth',
    type: 'SliderWidth',
    defaultValue: '100%',
    description: 'Maximum width of the slider',
  },
  {
    name: 'min',
    type: 'number',
    defaultValue: 0,
    description: 'Minimum value of the slider',
  },
  {
    name: 'minWidth',
    type: 'SliderWidth',
    defaultValue: null,
    description: 'Minimum width of the slider',
  },
  {
    name: 'onChange',
    type: '(v: number) => void',
    defaultValue: null,
    description: 'Callback function triggered when the value of the slider changes',
  },
  {
    name: 'orMore',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies if the slider allows values equal to or greater than the current value',
  },
  {
    name: 'postfix',
    type: 'string',
    defaultValue: null,
    description: 'Text to display after the slider value',
  },
  {
    name: 'precision',
    type: 'number',
    defaultValue: 0,
    description: 'Number of decimal places to round the slider value',
  },
  {
    name: 'value',
    type: 'Nullable<number>',
    defaultValue: null,
    description: 'Current value of the slider',
  },
  {
    name: 'showValue',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies if the slider value should be displayed',
  },
] as const;

export default sliderProps;
