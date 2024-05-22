const accordionPanelProps = [
  {
    name: '$key',
    type: 'string',
    defaultValue: null,
    description: 'The key for the AccordionPanel.',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'The class name for the AccordionPanel.',
  },
  {
    name: 'contentClassName',
    type: 'string',
    defaultValue: null,
    description: 'The class name for the content of the AccordionPanel.',
  },
  {
    name: 'contentStyle',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the content of the AccordionPanel.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Determines if the AccordionPanel is disabled.',
  },
  {
    name: 'icon',
    type: 'Icon',
    defaultValue: null,
    description: 'The icon for the AccordionPanel.',
  },
  {
    name: 'id',
    type: 'string',
    defaultValue: null,
    description: 'Unique identifier for the accordion panel.',
  },
  {
    name: 'labelClassName',
    type: 'string',
    defaultValue: null,
    description: 'The class name for the label of the AccordionPanel.',
  },
  {
    name: 'labelStyle',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the label of the AccordionPanel.',
  },
  {
    name: 'onClick',
    type: '(e: React.MouseEvent<HTMLButtonElement>) => void',
    defaultValue: null,
    description: 'Event handler for the click event on the AccordionPanel.',
  },
  {
    name: 'onKeyDown',
    type: '(e: React.KeyboardEvent<HTMLButtonElement>) => void',
    defaultValue: null,
    description: 'Event handler for the keydown event on the AccordionPanel.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the AccordionPanel.',
  },
  {
    name: 'subtitle',
    type: 'React.ReactNode',
    defaultValue: null,
    description: 'The subtitle of the AccordionPanel.',
  },
  {
    name: 'title',
    type: 'React.ReactNode',
    defaultValue: null,
    description: 'The title of the AccordionPanel.',
  },
] as const;

export default accordionPanelProps;
