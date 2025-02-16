import React from 'react';

import { createLinkBaseClasses } from './styles';
import type { LinkProps } from './types';

const Link = React.forwardRef<
  HTMLElement,
  LinkProps & Omit<React.HTMLProps<HTMLAnchorElement>, 'as' | 'ref'>
>(({ as = 'a', size, underlineVariant, className, children, ...props }, ref) => {
  const baseClasses = createLinkBaseClasses({ underlineVariant, size })(className);
  return React.createElement(as, { ...props, ref, className: baseClasses }, children);
});

Link.displayName = 'Link';

export default Link;
