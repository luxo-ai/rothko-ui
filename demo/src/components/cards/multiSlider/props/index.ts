const multiSliderProps = [
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
    description: 'Disables the multi-slider',
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
    description: 'Label for the multi-slider',
  },
  {
    name: 'max',
    type: 'number',
    defaultValue: null,
    description: 'Maximum value of the multi-slider',
  },
  {
    name: 'maxWidth',
    type: 'SliderWidth',
    defaultValue: '100%',
    description: 'Maximum width of the multi-slider',
  },
  {
    name: 'min',
    type: 'number',
    defaultValue: 0,
    description: 'Minimum value of the multi-slider',
  },
  {
    name: 'minWidth',
    type: 'SliderWidth',
    defaultValue: null,
    description: 'Minimum width of the multi-slider',
  },
  {
    name: 'onChange',
    type: '(r: Range) => void',
    defaultValue: null,
    description: 'Callback function triggered when the range of the multi-slider changes',
  },
  {
    name: 'orMore',
    type: 'boolean',
    defaultValue: null,
    description:
      'Specifies if the multi-slider allows values equal to or greater than the current range',
  },
  {
    name: 'postfix',
    type: 'string',
    defaultValue: null,
    description: 'Text to display after the multi-slider range',
  },
  {
    name: 'precision',
    type: 'number',
    defaultValue: 0,
    description: 'Number of decimal places to round the multi-slider range values',
  },
  {
    name: 'value',
    type: 'Nullable<Range>',
    defaultValue: null,
    description: 'Current range of the multi-slider',
  },
  {
    name: 'showRange',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies if the multi-slider range should be displayed',
  },
] as const;

export default multiSliderProps;
