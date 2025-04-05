import { asUnionStr } from '@helpers';

const accordionProps = [
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name(s).',
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: 'false',
    description: 'If `true`, removes spacing between panels.',
  },
  {
    name: 'icon',
    type: 'Icon',
    defaultValue: null,
    description: 'Custom icon for accordion state indicators.',
  },
  {
    name: 'multiple',
    type: 'boolean',
    defaultValue: 'false',
    description: 'If `true`, multiple panels can be expanded at once.',
  },
  {
    name: 'onPanelChange',
    type: '(isOpen: boolean, panelKey: string) => void',
    defaultValue: null,
    description: 'Callback when a panel is opened or closed.',
  },
  {
    name: 'selectedKeys',
    type: 'string[]',
    defaultValue: '[]',
    description: 'The list of selected panels by key.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'Inline style for the accordion.',
  },
  {
    name: 'variant',
    type: asUnionStr('bordered', 'none'),
    defaultValue: "'none'",
    description: 'Specifies the variant of the accordion.',
  },
] as const;

export default accordionProps;
