import { asUnionStr } from '@helpers';

const drawerProps = [
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
    description: 'Callback function called when the drawer is closed.',
  },
  {
    name: 'open',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Determines whether the drawer is open or closed.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the drawer.',
  },
  {
    name: 'variant',
    type: asUnionStr('shaded', 'none', 'blur'),
    defaultValue: "'shaded'",
    description: 'Variant of the backdrop.',
  },
] as const;

export default drawerProps;
