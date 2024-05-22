import { toCamelCase } from '@rothko-ui/utils';
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
  { label: 'Bottom Popup' },
  { label: 'Bread Crumbs' },
  { label: 'Button' },
  { label: 'Checkbox' },
  { label: 'Drawer' },
  { label: 'Input' },
  { label: 'Link' },
  { label: 'Modal' },
  { label: 'Radio Group' },
  {
    label: 'Select',
    children: [{ label: 'Select' }, { label: 'Multi Select' }, { label: 'Nested Select' }],
  },
  { label: 'Skeleton' },
  {
    label: 'Slider',
    children: [{ label: 'Slider' }, { label: 'Multi Slider' }],
  },
  { label: 'Switch' },
  { label: 'Tab Bar' },
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
