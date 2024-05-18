import React from 'react';
import { classes, scopedClasses as sc } from '@rothko-ui/utils';
import styles from './Dropdown.module.scss';

const scoppedClasses = sc(styles);

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
    const baseClasses = scoppedClasses(
      'dropown-container',
      error && 'error',
      open && 'open',
      // focus && 'focus',
      disabled && 'disabled'
    );
    return (
      <div {...props} ref={ref} className={classes(baseClasses, className)}>
        {children}
      </div>
    );
  }
);

DropdownContainer.displayName = 'DropdownContainer';

export default DropdownContainer;
