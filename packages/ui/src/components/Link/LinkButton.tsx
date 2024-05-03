import React from 'react';

import { classes, scopedClasses as sc } from '@rothko-ui/utils';

import type { LinkProps } from './types';
import styles from './Link.module.scss';

const scoppedClasses = sc(styles);

const LinkButton = React.forwardRef<
  HTMLElement,
  LinkProps & Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'ref'>
>(
  (
    {
      as = 'button',
      disabled,
      small,
      italic,
      underline,
      bold,
      light,
      kind,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = scoppedClasses(
      'link',
      disabled && 'link-button--disabled',
      small && 'link-small',
      italic && 'link--italic',
      underline && `link__underline-${underline}`,
      bold && 'link--bold',
      light && 'link--light',
      kind && `link--${kind}`
    );
    return React.createElement(
      as,
      { ...props, disabled, ref, className: classes(baseClasses, className) },
      children
    );
  }
);

LinkButton.displayName = 'LinkButton';

export default LinkButton;
