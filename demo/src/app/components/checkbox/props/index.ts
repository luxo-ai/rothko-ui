import { rothkoKindPropStr } from '@/components/constants';

const checkboxProps = [
  {
    name: 'checked',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether the checkbox is checked.',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name(s).',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether the checkbox is disabled.',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether there is an error with the checkbox.',
  },
  {
    name: 'errorText',
    type: 'string',
    defaultValue: '"Invalid"',
    description: 'The error text to be displayed when there is an error.',
  },
  {
    name: 'kind',
    type: rothkoKindPropStr,
    defaultValue: null,
    description: "The checkbox's semantic style.",
  },
  {
    name: 'onChange',
    type: '(v: boolean) => void',
    defaultValue: null,
    description: 'The callback function called when the checkbox value changes.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: null,
    description: 'Specifies whether the checkbox is required.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the checkbox.',
  },
  {
    name: 'styles',
    type: 'Object<StyleableComponents, CSSProperties>',
    defaultValue: null,
    description: 'Additional inline styles for the checkbox components.',
  },
] as const;

export default checkboxProps;
