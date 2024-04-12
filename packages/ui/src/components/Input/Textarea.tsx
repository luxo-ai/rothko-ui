import { classes } from '@rothko-ui/utils';
import React from 'react';
import styled from 'styled-components';
import { baseInputStyle } from './styles';
import type { HtmlTextareaProps, InputSize } from './types';

export type TextareaProps = {
  /** textarea size */
  size?: InputSize;
} & HtmlTextareaProps;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ size = 'm', className, disabled, tabIndex, ...props }, ref) => {
    const baseClasses = classes(`inpt_size_${size}`, className);
    return (
      <StyledTextarea
        ref={ref}
        className={baseClasses}
        disabled={disabled}
        tabIndex={disabled ? -1 : tabIndex}
        role="textbox"
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

const StyledTextarea = styled.textarea`
  ${baseInputStyle}
  display: block;
  height: 8rem;
  min-height: 6rem;
  max-height: 16rem;
  resize: vertical;
`;

export default Textarea;
