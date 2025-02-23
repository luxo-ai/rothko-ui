import { rothkoKindPropStr } from '@/components/constants';

const tabsProps = [
  {
    name: 'kind',
    type: rothkoKindPropStr,
    defaultValue: null,
    description: "The tab bar's semantic style",
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: null,
    description: 'CSS class name(s)',
  },
  {
    name: 'initialTab',
    type: 'string',
    defaultValue: null,
    description: 'The initial tab to display',
  },
  {
    name: 'onSelect',
    type: '(tab: string) => void',
    defaultValue: null,
    description: 'The callback function to be called when a tab is selected',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultValue: null,
    description: 'The inline style for the tabs',
  },
  {
    name: 'styles',
    type: 'Object<StyleableComponents, React.CSSProperties>',
    defaultValue: null,
    description: 'Additional inline styles for the tabs',
  },
  {
    name: 'children',
    type: 'ReadonlyArray<ReactElement<TabProps>>',
    defaultValue: null,
    description: 'The tabs to display',
  },
] as const;

export default tabsProps;
