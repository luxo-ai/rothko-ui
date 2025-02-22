import React from 'react';

import { classes } from '../../utils/classes';

export type DropdownContainerProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  'focus' | 'error' | 'ref' | 'disabled' | 'open'
> & {
  children: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  open?: boolean;
};

const DropdownContainer = React.forwardRef<HTMLDivElement, DropdownContainerProps>(
  ({ children, error, disabled, open, className, ...props }, ref) => {
    const clz = classes(
      'ios-tap-highlight-color-transparent',
      'text-(--rothko-input-foreground)',
      'rothko-font-regular',
      'rothko-paragraph-size-s',
      'bg-(--rothko-input-background)',
      'rounded-(--rothko-input-border-radius)',
      error && 'border-(--rothko-danger)', // && !focus
      'relative',
      'flex',
      'items-center',
      'justify-between',
      'p-[0.5rem_1rem]',
      'min-h-[3.25rem]', // calc(1.5rem+2*0.125rem+2*0.5rem+2*2px), placeholder text (body) line-height + text margin + top padding + bottom padding + top border + bottom border
      // ^ maybe make smaller?
      !disabled && !open && 'cursor-pointer',
      disabled && 'cursor-not-allowed',
      disabled && 'opacity-60'
    );

    /*
     &.focus {
    //  outline: 0.125rem solid green;
    //  outline-offset: 0.125rem;
    }
    */

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <div {...props} ref={ref} className={classes(clz, className)}>
        {children}
      </div>
    );
  }
);

DropdownContainer.displayName = 'DropdownContainer';

export default DropdownContainer;
