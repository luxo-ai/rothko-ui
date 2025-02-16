import { PhantomButton } from '@rothko-ui/system';
import React from 'react';

import { createLinkBaseClasses } from './styles';
import type { LinkProps } from './types';

const LinkButton = React.forwardRef<
  HTMLButtonElement,
  LinkProps & Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'ref' | 'type'>
>(({ disabled, size, underlineVariant, className, children, ...props }, ref) => {
  const baseClasses = createLinkBaseClasses({ underlineVariant, size, disabled })(className);
  return (
    <PhantomButton
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      disabled={disabled}
      ref={ref}
      className={baseClasses}
    >
      {children}
    </PhantomButton>
  );
});

LinkButton.displayName = 'LinkButton';

export default LinkButton;
