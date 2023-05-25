import camelCase from 'lodash/camelCase';
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
  { label: 'Bottom Popup' },
  { label: 'Bread Crumbs' },
  { label: 'Button' },
  { label: 'Checkbox' },
  { label: 'Drawer' },
  {
    label: 'Dropdown',
    children: [{ label: 'Dropdown' }, { label: 'Multi Dropdown' }, { label: 'Nested Dropdown' }],
  },
  { label: 'Input' },
  { label: 'Modal' },
  { label: 'Radio' },
  { label: 'Search' },
  { label: 'Skeleton' },
  {
    label: 'Slider',
    children: [{ label: 'Slider' }, { label: 'Multi Slider' }],
  },
  { label: 'Tab Bar' },
  { label: 'Tag' },
  { label: 'Toast' },
  { label: 'Toggle' },
];

export const buildSections = (
  sectionList: readonly NavigationSectionWithoutTo[],
  urlPrefix?: string
): NavigationSection[] => {
  return sectionList.map(item => {
    const children = 'children' in item ? buildSections(item.children, urlPrefix) : undefined;
    const route = camelCase(item.label);
    return {
      ...item,
      to: urlPrefix ? `${urlPrefix}/${camelCase(item.label)}` : route,
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
    children: buildSections(COMPONENTS, 'components'),
  },
];
