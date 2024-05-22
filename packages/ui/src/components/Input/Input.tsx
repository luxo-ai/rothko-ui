import React from 'react';

import { classes, scopedClasses as sc } from '@rothko-ui/utils';

import type { HtmlInputProps, InputSize, TextProps } from './types';
import styles from './Input.module.scss';

const scoppedClasses = sc(styles);

export type InputProps = HtmlInputProps & {
  /**
   * The size of the input.
   * @default 'm'
   */
  size?: InputSize;
  /**
   * Specifies whether there is an error with the input.
   */
  error?: boolean;
  /**
   * The variant of the input.
   */
  variant?: keyof TextProps;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'm', variant, error, className, disabled, tabIndex, ...props }, ref) => {
    const baseClasses = scoppedClasses(
      'input',
      `input--${size}`,
      variant && `input--${variant}`,
      error && 'error'
    );
    return (
      <input
        {...props}
        ref={ref}
        className={classes(baseClasses, className)}
        disabled={disabled}
        tabIndex={disabled ? -1 : tabIndex}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
