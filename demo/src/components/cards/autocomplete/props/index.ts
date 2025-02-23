import { asUnionStr } from '@/components/helpers';

const autocompleteProps = [
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name(s).',
  },
  {
    name: 'clearable',
    type: 'boolean',
    defaultValue: 'true',
    description: ' Whether the autocomplete is clearable.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: null,
    description: 'Whether the autocomplete is disabled.',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: null,
    description: 'Whether the autocomplete has an error state.',
  },
  {
    name: 'errorText',
    type: 'string',
    defaultValue: '"Invalid"',
    description: 'The error message to display when the autocomplete has an error state.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: null,
    description: 'The label for the autocomplete.',
  },
  {
    name: 'menuVariant',
    type: asUnionStr('top', 'bottom'),
    defaultValue: "'bottom'",
    description: 'The position of the autocomplete menu.',
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
    description: 'Event handler for when the autocomplete loses focus.',
  },
  {
    name: 'onChange',
    type: '(value: V | null) => void',
    defaultValue: null,
    description: 'Event handler for when the autocomplete value changes.',
  },
  {
    name: 'onClear',
    type: '() => void',
    defaultValue: null,
    description: 'Event handler for when the autocomplete is cleared.',
  },
  {
    name: 'onClose',
    type: '() => void',
    defaultValue: null,
    description: 'Event handler for when the autocomplete is closed.',
  },
  {
    name: 'onFocus',
    type: '(e: FocusEvent) => void',
    defaultValue: null,
    description: 'Event handler for when the autocomplete gains focus.',
  },
  {
    name: 'onOpen',
    type: '() => void',
    defaultValue: null,
    description: 'Event handler for when the autocomplete is opened.',
  },
  {
    name: 'options',
    type: 'Option<V, T>[]',
    defaultValue: null,
    description: 'The options for the autocomplete.',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: '"Select"',
    description: 'The placeholder text for the autocomplete.',
  },
  {
    name: 'renderOption',
    type: 'RenderOption<V, T>',
    defaultValue: 'DefaultRenderOption',
    description: 'Custom rendering function for autocomplete options.',
  },
  {
    name: 'searchFn',
    type: 'QueryMatchFn<V, T>',
    defaultValue: null,
    description: 'Custom search function for filtering options.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'Inline styles for the autocomplete.',
  },
  {
    name: 'value',
    type: 'V | null',
    defaultValue: null,
    description: 'The selected value of the autocomplete.',
  },
] as const;

export default autocompleteProps;
