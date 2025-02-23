import { rothkoKindPropStr } from '@/components/constants';
import { asUnionStr } from '@/components/helpers';

const tagProps = [
  {
    name: 'variant',
    type: asUnionStr('filled', 'outlined'),
    defaultValue: "'filled'",
    description: 'The appearance style of the tag',
  },
  {
    name: 'children',
    type: 'ReactNode',
    defaultValue: null,
    description: 'The content of the tag',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name(s)',
  },
  {
    name: 'kind',
    type: rothkoKindPropStr,
    defaultValue: null,
    description: "The tag's semantic style",
  },
  {
    name: 'onClose',
    type: '() => void',
    defaultValue: null,
    description: 'The callback function when the tag is closed',
  },
  {
    name: 'role',
    type: 'AriaRole',
    defaultValue: null,
    description: 'The ARIA role for the tag',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the tag',
  },
] as const;

export default tagProps;
