import React from 'react';

import type { LinkProps } from './types';
import { baseClz } from './styles';

const Link = React.forwardRef<
  HTMLElement,
  LinkProps & Omit<React.HTMLProps<HTMLAnchorElement>, 'as' | 'ref'>
>(({ as = 'a', size, underlineVariant, kind, className, children, ...props }, ref) => {
  const baseClasses = baseClz({ underlineVariant, size })(className);
  return React.createElement(as, { ...props, ref, className: baseClasses }, children);
});

Link.displayName = 'Link';

export default Link;
