import camelCase from 'lodash/camelCase';
import type { NavigationSection, NavigationSectionWithoutTo } from './types';

const GETTING_STARTED: readonly NavigationSectionWithoutTo[] = [
  { label: 'Overview' },
  { label: 'Setup' },
  { label: 'Theming' },
  { label: 'Typography' },
  { label: 'Icons' },
];

const COMPONENTS: readonly NavigationSectionWithoutTo[] = [
  { label: 'Accordion' },
  { label: 'Alert' },
  { label: 'Avatar' },
  { label: 'Bottom Popup' },
  { label: 'Bread Crumbs' },
  { label: 'Button' },
  { label: 'Checkbox' },
  { label: 'Drawer' },
  {
    label: 'Dropdown',
    children: [
      { label: 'Single Dropdown' },
      { label: 'Multi Dropdown' },
      { label: 'Nested Dropdown' },
    ],
  },
  { label: 'Input' },
  { label: 'Label' },
  { label: 'List' },
  { label: 'Loader' },
  { label: 'Modal' },
  { label: 'Notification' },
  { label: 'Radio' },
  { label: 'Search' },
  { label: 'Skeleton' },
  {
    label: 'Slider',
    children: [{ label: 'Single Slider' }, { label: 'Range Slider' }],
  },
  { label: 'TabBar' },
  { label: 'Tag' },
  { label: 'Toast' },
  { label: 'Toggle' },
];

const FORMS: readonly NavigationSectionWithoutTo[] = [
  { label: 'Overview' },
  {
    label: 'Components',
    children: [{ label: 'Input' }, { label: 'Checkbox' }],
  },
];

export const buildSections = (
  sectionList: readonly NavigationSectionWithoutTo[],
  urlPrefix = ''
): NavigationSection[] => {
  return sectionList.map(item => {
    const children = 'children' in item ? buildSections(item.children, urlPrefix) : undefined;
    return {
      ...item,
      to: `${urlPrefix}/${camelCase(item.label)}`,
      children,
    };
  });
};

export const NAVIGATION_LIST: readonly NavigationSection[] = [
  {
    label: 'Getting Started',
    children: buildSections(GETTING_STARTED),
  },
  {
    label: 'Components',
    children: buildSections(COMPONENTS, 'component'),
  },
  {
    label: 'Forms',
    children: buildSections(FORMS, 'form'),
  },
];
