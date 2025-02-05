import React from 'react';

import { classes, scopedClasses } from '@rothko-ui/system';

import type { LinkProps } from './types';
import styles from './Link.module.scss';

const sc = scopedClasses(styles);

const Link = React.forwardRef<
  HTMLElement,
  LinkProps & Omit<React.HTMLProps<HTMLAnchorElement>, 'as' | 'ref'>
>(({ as = 'a', small, underline, disabled, kind, className, children, ...props }, ref) => {
  const baseClasses = sc(
    'link',
    small && 'link-small',
    disabled && 'link--disabled',
    underline && `link__underline-${underline}`
  );
  return React.createElement(
    as,
    { ...props, ref, className: classes(baseClasses, className) },
    children
  );
});

Link.displayName = 'Link';

export default Link;
