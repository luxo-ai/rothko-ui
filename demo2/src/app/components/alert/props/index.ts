import { rothkoKindPropStr } from '@/components/constants';

const alertProps = [
  {
    name: 'variant',
    type: "'filled' | 'outline'",
    defaultValue: "'filled'",
    description: 'Specifies the variant of the alert.',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name(s).',
  },
  {
    name: 'kind',
    type: rothkoKindPropStr,
    defaultValue: "'danger'",
    description: "The alert's semantic style.",
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the alert.',
  },
] as const;

export default alertProps;
