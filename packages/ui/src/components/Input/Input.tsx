import { classes } from '@rothko-ui/utils';
import React from 'react';
import styled from 'styled-components';
import { baseInputStyle } from './styles';
import type { HtmlInputProps, InputSize } from './types';

export type InputProps = {
  /** input size */
  size?: InputSize;
  error?: boolean;
} & HtmlInputProps;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'm', error, className, disabled, tabIndex, ...props }, ref) => {
    return (
      <StyledInput
        {...props}
        aria-label="input"
        ref={ref}
        className={classes(`inpt_size_${size}`, { error }, className)}
        disabled={disabled}
        tabIndex={disabled ? -1 : tabIndex}
      />
    );
  }
);

Input.displayName = 'Input';

const StyledInput = styled.input`
  ${baseInputStyle}
`;

export default Input;
