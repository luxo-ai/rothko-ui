import React from 'react';

import { createInputBaseClasses } from './styles';

export type HtmlInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'ref' | 'size' | 'error' | 'as'
>;

interface InputProps extends HtmlInputProps {
  /**
   * Specifies whether there is an error with the input.
   */
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, disabled, tabIndex, ...props }, ref) => {
    return (
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        ref={ref}
        className={createInputBaseClasses({ error, disabled })(className)}
        disabled={disabled}
        tabIndex={disabled ? -1 : tabIndex}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
