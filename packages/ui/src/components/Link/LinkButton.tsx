import React from 'react';

import { classes, scopedClasses } from '@rothko-ui/utils';

import type { LinkProps } from './types';
import styles from './Link.module.scss';
import PhantomButton from '../../library/Button/PhantomButton';

const sc = scopedClasses(styles);

const LinkButton = React.forwardRef<
  HTMLButtonElement,
  LinkProps & Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'ref' | 'type'>
>(
  (
    { disabled, small, italic, underline, bold, light, kind, className, children, ...props },
    ref
  ) => {
    const baseClasses = sc(
      'link',
      disabled && 'link-button--disabled',
      small && 'link-small',
      italic && 'link--italic',
      underline && `link__underline-${underline}`,
      bold && 'link--bold',
      light && 'link--light',
      kind && `link--${kind}`
    );
    return (
      <PhantomButton
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        disabled={disabled}
        ref={ref}
        className={classes(baseClasses, className)}
      >
        {children}
      </PhantomButton>
    );
  }
);

LinkButton.displayName = 'LinkButton';

export default LinkButton;
