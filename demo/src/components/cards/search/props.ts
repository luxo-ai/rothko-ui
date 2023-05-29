const searchProps = [
  {
    name: 'dataFetcher',
    type: 'OptionFetcher<V, T>',
    defaultValue: null,
    description: 'Function for fetching data asynchronously',
  },
  {
    name: 'onSearch',
    type: '(query: string, id?: V) => void',
    defaultValue: null,
    description: 'Callback function triggered on search',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: 'Search...',
    description: 'Placeholder text in the input',
  },
  {
    name: 'onBlur',
    type: '(e: FocusEvent) => void',
    defaultValue: null,
    description: 'Event handler for onBlur',
  },
  {
    name: 'onFocus',
    type: '(e: FocusEvent) => void',
    defaultValue: null,
    description: 'Event handler for onFocus',
  },
  {
    name: 'onOpen',
    type: '() => void',
    defaultValue: null,
    description: 'Event handler for onOpen',
  },
  {
    name: 'closeOnEsc',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Specifies whether the dropdown should close on ESC (escape)',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: null,
    description: 'Disables the search dropdown',
  },
  {
    name: 'renderOption',
    type: 'RenderOption<V, T>',
    defaultValue: null,
    description: 'Custom method for rendering each option',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'Class names of the outer wrapper',
  },
  {
    name: 'renderLoading',
    type: '() => JSX.Element',
    defaultValue: null,
    description: 'Function for rendering loading state',
  },
  {
    name: 'optionLimit',
    type: 'number',
    defaultValue: null,
    description: 'Limit the number of results shown in the dropdown',
  },
  {
    name: 'mode',
    type: 'dropdown | popout',
    defaultValue: 'dropdown',
    description: 'Type of search experience',
  },
  {
    name: 'popoutHeader',
    type: 'React.ReactElement',
    defaultValue: null,
    description: 'Header of the search when in popout mode',
  },
  {
    name: 'traditionalUx',
    type: 'boolean',
    defaultValue: null,
    description: 'Opt into traditional search dropdown style',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: null,
    description: 'Label for the search dropdown',
  },
  {
    name: 'initialQuery',
    type: 'string',
    defaultValue: null,
    description: 'Initial value for the search query',
  },
] as const;

export default searchProps;
