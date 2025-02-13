import React from 'react';

import type { HtmlInputProps } from './types';
import { inputBaseCls } from './styles';

type InputProps = HtmlInputProps & {
  /**
   * Specifies whether there is an error with the input.
   */
  error?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, disabled, tabIndex, ...props }, ref) => {
    return (
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        ref={ref}
        className={inputBaseCls({ error, disabled })(className)}
        disabled={disabled}
        tabIndex={disabled ? -1 : tabIndex}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
