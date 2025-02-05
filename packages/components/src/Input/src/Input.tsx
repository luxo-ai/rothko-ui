import React from 'react';

import { classes, scopedClasses } from '@rothko-ui/system';

import type { HtmlInputProps } from './types';
import styles from './Input.module.scss';

const sc = scopedClasses(styles);

type InputProps = HtmlInputProps & {
  /**
   * Specifies whether there is an error with the input.
   */
  error?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, disabled, tabIndex, ...props }, ref) => {
    const baseClasses = sc('input', error && 'error');
    return (
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
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
