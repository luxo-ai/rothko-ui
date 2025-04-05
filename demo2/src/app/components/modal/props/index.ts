import { asUnionStr } from '@helpers';

import { rothkoSizePropStr } from '@/components/constants';

const modalProps = [
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name(s).',
  },
  {
    name: 'open',
    type: 'boolean',
    defaultValue: null,
    description: 'Whether the modal is open or closed.',
  },
  {
    name: 'onClose',
    type: '() => void',
    defaultValue: null,
    description: 'The callback function called when the modal is closed.',
  },
  {
    name: 'size',
    type: rothkoSizePropStr,
    defaultValue: "'m'",
    description: 'Size of the modal',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the modal.',
  },
  {
    name: 'title',
    type: 'string',
    defaultValue: null,
    description: 'The title of the modal.',
  },
  {
    name: 'variant',
    type: asUnionStr('shaded', 'none', 'blur'),
    defaultValue: "'shaded'",
    description: 'Variant of the backdrop.',
  },
] as const;

export default modalProps;
