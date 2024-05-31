const nestedSelectProps = [
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'Additional class name for the select',
  },
  {
    name: 'clearable',
    type: 'boolean',
    defaultValue: null,
    description: 'Whether the select is clearable',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: null,
    description: 'Whether the select is disabled',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: null,
    description: 'Whether the select has an error state',
  },
  {
    name: 'errorText',
    type: 'string',
    defaultValue: 'Invalid',
    description: 'The error message to display when the select has an error state',
  },
  {
    name: 'id',
    type: 'string',
    defaultValue: null,
    description: 'ID for the select element',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: null,
    description: 'The label for the select',
  },
  {
    name: 'menuVariant',
    type: 'MenuVariant',
    defaultValue: 'bottom',
    description: 'The position of the select menu',
  },
  {
    name: 'noResultsMessage',
    type: 'React.ReactNode',
    defaultValue: 'No results',
    description: 'The message to display when there are no search results',
  },
  {
    name: 'onBlur',
    type: 'FocusHandler',
    defaultValue: null,
    description: 'Event handler for when the select loses focus',
  },
  {
    name: 'onChange',
    type: '(v: V | null) => void',
    defaultValue: null,
    description: 'Event handler for value change',
  },
  {
    name: 'onClear',
    type: '() => void',
    defaultValue: null,
    description: 'Event handler for when the select is cleared',
  },
  {
    name: 'onClose',
    type: '() => void',
    defaultValue: null,
    description: 'Event handler for when the select is closed',
  },
  {
    name: 'onFocus',
    type: 'FocusHandler',
    defaultValue: null,
    description: 'Event handler for when the select gains focus',
  },
  {
    name: 'onOpen',
    type: '() => void',
    defaultValue: null,
    description: 'Event handler for when the select is opened',
  },
  {
    name: 'options',
    type: 'NestedOption<V, T>[]',
    defaultValue: null,
    description: 'Select options',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: 'Select',
    description: 'The placeholder text for the select',
  },
  {
    name: 'renderOption',
    type: 'RenderNestedOption<V, T>',
    defaultValue: null,
    description: 'Custom method for rendering option',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    defaultValue: null,
    description: 'Custom styles for the select',
  },
  {
    name: 'value',
    type: 'V | null',
    defaultValue: null,
    description: 'Current value of select or value array if multiple',
  },
] as const;

export default nestedSelectProps;
