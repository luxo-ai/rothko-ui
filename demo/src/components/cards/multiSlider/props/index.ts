import { rothkoKindPropStr } from '@/components/constants';

const multiSliderProps = [
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name(s)',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether the slider is disabled',
  },
  {
    name: 'kind',
    type: rothkoKindPropStr,
    defaultValue: null,
    description: 'The semantic style of the slider',
  },
  {
    name: 'max',
    type: 'number',
    defaultValue: null,
    description: 'Maximum value of the slider',
  },
  {
    name: 'min',
    type: 'number',
    defaultValue: 0,
    description: 'Minimum value of the slider',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the slider',
  },
  {
    name: 'onChange',
    type: '(r: Range) => void',
    defaultValue: null,
    description: 'Callback function triggered when the range of the multi-slider changes',
  },
  {
    name: 'value',
    type: '[number, number] | undefined | null',
    defaultValue: null,
    description: 'Current value of the slider',
  },
  {
    name: 'children',
    type: 'ReactElement<SliderHandleProps>;',
    defaultValue: null,
    description: 'Slider handle',
  },
] as const;

export default multiSliderProps;
