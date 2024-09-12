import React from 'react';

import { classes, scopedClasses } from '@rothko-ui/utils';

import type { LinkProps } from './types';
import styles from './Link.module.scss';

const sc = scopedClasses(styles);

const Link = React.forwardRef<
  HTMLElement,
  LinkProps & Omit<React.HTMLProps<HTMLAnchorElement>, 'as' | 'ref'>
>(
  (
    { as = 'a', small, italic, underline, bold, light, kind, className, children, ...props },
    ref
  ) => {
    const baseClasses = sc(
      'link',
      small && 'link-small',
      italic && 'link--italic',
      underline && `link__underline-${underline}`,
      bold && 'link--bold',
      light && 'link--light',
      kind && `link--${kind}`
    );
    return React.createElement(
      as,
      { ...props, ref, className: classes(baseClasses, className) },
      children
    );
  }
);

Link.displayName = 'Link';

export default Link;
