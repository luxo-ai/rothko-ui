import { rothkoKindPropStr } from '@/components/constants';

const radioGroupProps = [
  {
    name: 'className',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'CSS class name(s).',
  },
  {
    name: 'classNames',
    type: 'Object<StyleableComponents, string>',
    defaultValue: null,
    description: 'Additional class names for the radio group components.',
  },
  {
    name: 'columnGap',
    type: 'string | number',
    defaultValue: "'0.5rem'",
    description: 'The gap between columns in the radio group.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Specifies whether the radio group is disabled.',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether the radio group has an error state.',
  },
  {
    name: 'errorText',
    type: 'string',
    defaultValue: "'Invalid'",
    description: 'The error message to be displayed when the radio group has an error state.',
  },
  {
    name: 'kind',
    type: rothkoKindPropStr,
    defaultValue: null,
    description: "The radio group's semantic style.",
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: null,
    description: 'The label for the radio group.',
  },
  {
    name: 'maxCol',
    type: 'number',
    defaultValue: 4,
    description: 'The maximum number of columns in the radio group.',
  },
  {
    name: 'onChange',
    type: '($key: K) => void',
    defaultValue: null,
    description: 'The callback function called when the value of the radio group changes.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether the radio group is required.',
  },
  {
    name: 'rowGap',
    type: 'string | number',
    defaultValue: "'0.5rem'",
    description: 'The gap between rows in the radio group.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the radio group.',
  },
  {
    name: 'styles',
    type: 'Object<StyleableComponents, CSSProperties>',
    defaultValue: null,
    description: 'Additional inline styles for the radio group components.',
  },
  {
    name: 'value',
    type: 'K | null',
    defaultValue: null,
    description: 'The current value of the radio group.',
  },
] as const;

export default radioGroupProps;
