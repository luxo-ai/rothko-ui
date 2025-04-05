import type { NavigationSection, NavigationSectionLeaf } from './types';

export const isLeaf = (item: NavigationSection): item is NavigationSectionLeaf => {
  return !('children' in item && item.children);
};
