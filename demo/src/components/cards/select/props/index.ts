import { asUnionStr } from '@/components/helpers';

const selectProps = [
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name(s).',
  },
  {
    name: 'classNames',
    type: 'Object<StyledComponents, string>',
    defaultValue: null,
    description: 'Additional class names for the select components',
  },
  {
    name: 'clearable',
    type: 'boolean',
    defaultValue: null,
    description: 'Whether the select is clearable.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: null,
    description: 'Whether the select is disabled.',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: null,
    description: 'Whether the select has an error state.',
  },
  {
    name: 'errorText',
    type: 'string',
    defaultValue: 'Invalid',
    description: 'The error message to display when the select has an error state.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: null,
    description: 'The label for the select.',
  },
  {
    name: 'menuVariant',
    type: asUnionStr('top', 'bottom'),
    defaultValue: "'bottom'",
    description: 'The position of the select menu.',
  },
  {
    name: 'noResultsMessage',
    type: 'ReactNode',
    defaultValue: '"No results"',
    description: 'The message to display when there are no search results.',
  },
  {
    name: 'onBlur',
    type: '(e: FocusEvent) => void',
    defaultValue: null,
    description: 'Event handler for when the select loses focus.',
  },
  {
    name: 'onChange',
    type: '(v: V | null) => void',
    defaultValue: null,
    description: 'Event handler for when the select value changes.',
  },
  {
    name: 'onClear',
    type: '() => void',
    defaultValue: null,
    description: 'Event handler for when the select is cleared.',
  },
  {
    name: 'onClose',
    type: '() => void',
    defaultValue: null,
    description: 'Event handler for when the select is closed.',
  },
  {
    name: 'onFocus',
    type: '(e: FocusEvent) => void',
    defaultValue: null,
    description: 'Event handler for when the select gains focus.',
  },
  {
    name: 'onOpen',
    type: '() => void',
    defaultValue: null,
    description: 'Event handler for when the select is opened.',
  },
  {
    name: 'options',
    type: 'Option<V, T>[]',
    defaultValue: null,
    description: 'The options for the select.',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: '"Select"',
    description: 'The placeholder text for the select.',
  },
  {
    name: 'renderOption',
    type: 'RenderOption<V, T>',
    defaultValue: null,
    description: 'Custom rendering function for select options.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'Inline styles for the select.',
  },
  {
    name: 'styles',
    type: 'Object<StyledComponents, CSSProperties>',
    defaultValue: null,
    description: 'Additional inline styles for the select components.',
  },
  {
    name: 'value',
    type: 'V | null',
    defaultValue: null,
    description: 'The value(s) of the select.',
  },
] as const;

export default selectProps;
