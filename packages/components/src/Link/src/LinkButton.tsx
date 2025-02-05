import React from 'react';

import { classes, scopedClasses, PhantomButton } from '@rothko-ui/system';

import type { LinkProps } from './types';
import styles from './Link.module.scss';

const sc = scopedClasses(styles);

const LinkButton = React.forwardRef<
  HTMLButtonElement,
  LinkProps & Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'ref' | 'type'>
>(({ disabled, small, underline, className, children, ...props }, ref) => {
  const baseClasses = sc(
    'link',
    small && 'link-small',
    disabled && 'link--disabled',
    underline && `link__underline-${underline}`
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
});

LinkButton.displayName = 'LinkButton';

export default LinkButton;
