import toCamelCase from 'lodash.camelcase';
import type { NavigationSection, NavigationSectionWithoutTo } from './types';

const GETTING_STARTED: readonly NavigationSectionWithoutTo[] = [
  { label: 'Overview' },
  { label: 'Theming' },
  { label: 'Typography' },
  { label: 'Icons' },
];

const COMPONENTS: readonly NavigationSectionWithoutTo[] = [
  { label: 'Accordion' },
  { label: 'Alert' },
  { label: 'Autocomplete' },
  { label: 'Bread Crumbs' },
  { label: 'Button' },
  { label: 'Checkbox' },
  { label: 'Drawer' },
  { label: 'Input' },
  { label: 'Modal' },
  { label: 'Popup' },
  { label: 'Radio Group' },
  {
    label: 'Select',
    children: [{ label: 'Select' }, { label: 'Multi Select' }],
  },
  { label: 'Skeleton' },
  {
    label: 'Slider',
    children: [{ label: 'Slider' }, { label: 'Multi Slider' }],
  },
  { label: 'Switch' },
  { label: 'Tabs' },
  { label: 'Tag' },
  { label: 'Textarea' },
  { label: 'Toast' },
];

export const buildSections = (
  sectionList: readonly NavigationSectionWithoutTo[],
  baseUrl: string
): NavigationSection[] => {
  return sectionList.map(item => {
    const children = 'children' in item ? buildSections(item.children, baseUrl) : undefined;
    return {
      ...item,
      to: [baseUrl, toCamelCase(item.label)].join('/').replace(/\/+/g, '/'),
      children,
    };
  });
};

export const NAVIGATION_LIST: readonly NavigationSection[] = [
  {
    label: 'Getting Started',
    children: buildSections(GETTING_STARTED, '/'),
  },
  {
    label: 'Components',
    children: buildSections(COMPONENTS, '/components'),
  },
];
