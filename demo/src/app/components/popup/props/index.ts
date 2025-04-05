import { asUnionStr } from '@helpers';

const popupProps = [
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name(s).',
  },
  {
    name: 'onClose',
    type: '() => void',
    defaultValue: null,
    description: 'Callback function to be called when the popup is closed.',
  },
  {
    name: 'open',
    type: 'boolean',
    defaultValue: null,
    description: 'Determines whether the popup is open or closed.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the popup.',
  },
  {
    name: 'variant',
    type: asUnionStr('shaded', 'none', 'blur'),
    defaultValue: "'none'",
    description: 'Variant of the backdrop.',
  },
] as const;

export default popupProps;
