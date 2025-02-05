import React from 'react';
import { classes, scopedClasses } from '../../utils/classes';
import styles from './DropdownContainer.module.scss';

const sc = scopedClasses(styles);

export type DropdownContainerProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  'focus' | 'error' | 'ref' | 'disabled' | 'open'
> & {
  children: React.ReactNode;
  focus?: boolean;
  error?: boolean;
  disabled?: boolean;
  open?: boolean;
};

const DropdownContainer = React.forwardRef<HTMLDivElement, DropdownContainerProps>(
  ({ children, error, disabled, open, className, ...props }, ref) => {
    const baseClasses = sc(
      'dropdown-container',
      error && 'error',
      open && 'open',
      // focus && 'focus',
      disabled && 'disabled'
    );
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <div {...props} ref={ref} className={classes(baseClasses, className)}>
        {children}
      </div>
    );
  }
);

DropdownContainer.displayName = 'DropdownContainer';

export default DropdownContainer;
