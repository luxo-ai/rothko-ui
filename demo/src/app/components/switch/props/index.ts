import { rothkoKindPropStr } from '@/components/constants';

const switchProps = [
  {
    name: 'children',
    type: 'ReactNode',
    defaultValue: null,
    description: 'The content of the switch',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name(s)',
  },
  {
    name: 'classNames',
    type: 'Objecct<StyleableComponents, string>',
    defaultValue: null,
    description: 'Additional class names for the switch',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: false,
    description: 'Specifies whether the switch has an error state',
  },
  {
    name: 'errorText',
    type: 'string',
    defaultValue: '"Invalid"',
    description: 'The error text to be displayed when the switch is in an error state',
  },
  {
    name: 'kind',
    type: rothkoKindPropStr,
    defaultValue: null,
    description: "The switch's semantic style",
  },
  {
    name: 'onChange',
    type: '(selected: boolean) => void',
    defaultValue: null,
    description: "The event handler called when the switch's value changes",
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    defaultValue: null,
    description: 'Inline style for the switch',
  },
  {
    name: 'styles',
    type: 'Object<StyleableComponents, string>',
    defaultValue: null,
    description: 'Additional inline styles for the switch',
  },
  {
    name: 'selected',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether the switch is selected',
  },
  {
    name: 'onIcon',
    type: 'ReactElement',
    defaultValue: null,
    description: 'The icon element to be displayed when the switch is in the "on" state',
  },
  {
    name: 'offIcon',
    type: 'ReactElement',
    defaultValue: null,
    description: 'The icon element to be displayed when the switch is in the "off" state',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether the switch is disabled',
  },
] as const;

export default switchProps;
