import { asUnionStr } from '@helpers';

import { rothkoKindPropStr, rothkoSizePropStr } from '@/components/constants';

const buttonProps = [
  {
    name: 'accessoryLeft',
    type: 'Accessory',
    defaultValue: null,
    description: 'The left accessory component.',
  },
  {
    name: 'accessoryRight',
    type: 'Accessory',
    defaultValue: null,
    description: 'The right accessory component.',
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
    description: 'Whether the button is disabled.',
  },
  {
    name: 'asIcon',
    type: 'boolean',
    defaultValue: null,
    description: 'Display the button as an icon.',
  },
  {
    name: 'kind',
    type: rothkoKindPropStr,
    defaultValue: "'primary'",
    description: "The button's semantic style.",
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: null,
    description: 'Whether the button is in a loading state.',
  },
  {
    name: 'onClick',
    type: '(e: MouseEvent) => void',
    defaultValue: null,
    description: 'The click event handler.',
  },
  {
    name: 'onKeyDown',
    type: '(e: KeyboardEvent) => void',
    defaultValue: null,
    description: 'The keydown event handler.',
  },
  {
    name: 'role',
    type: 'AriaRole',
    defaultValue: "'button'",
    description: 'The role of the button.',
  },
  {
    name: 'variant',
    type: asUnionStr('filled', 'outline'),
    defaultValue: "'filled'",
    description: 'The variant of the button.',
  },
  {
    name: 'size',
    type: rothkoSizePropStr,
    defaultValue: "'m'",
    description: 'The size of the button.',
  },
  {
    name: 'radius',
    type: asUnionStr('none', 'default', 'full'),
    defaultValue: "'default'",
    description: 'The radius of the button.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the button.',
  },
  {
    name: 'tabIndex',
    type: 'number',
    defaultValue: null,
    description: 'The tab index of the button.',
  },
  {
    name: 'type',
    type: asUnionStr('button', 'submit', 'reset'),
    defaultValue: "'button'",
    description: 'The type of the button.',
  },
] as const;

export default buttonProps;
