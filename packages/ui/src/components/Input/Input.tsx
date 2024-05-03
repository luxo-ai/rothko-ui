import React from 'react';

import { classes, scopedClasses as sc } from '@rothko-ui/utils';

import type { HtmlInputProps, InputSize, TextProps } from './types';
import styles from './Input.module.scss';

const scoppedClasses = sc(styles);

export type InputProps = HtmlInputProps &
  TextProps & {
    /**
     * The size of the input.
     * @default 'm'
     */
    size?: InputSize;
    /**
     * Specifies whether there is an error with the input.
     */
    error?: boolean;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'm', light, bold, italic, error, className, disabled, tabIndex, ...props }, ref) => {
    const baseClasses = scoppedClasses(
      'input',
      `input--${size}`,
      light && 'input--light',
      bold && 'input--bold',
      italic && 'input--italic',
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
