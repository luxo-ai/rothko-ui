import { classes } from '@rothko-ui/utils';
import React from 'react';
import type { HtmlInputProps, InputSize } from './types';
import styles from './Input.module.scss';

export type InputProps = {
  /** input size */
  $size?: InputSize;
  $error?: boolean;
} & HtmlInputProps;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ $size = 'm', $error, className, disabled, tabIndex, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={classes(
          styles['inpt'],
          styles[`inpt_size_${$size}`],
          $error && styles['error'],
          className
        )}
        disabled={disabled}
        tabIndex={disabled ? -1 : tabIndex}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
