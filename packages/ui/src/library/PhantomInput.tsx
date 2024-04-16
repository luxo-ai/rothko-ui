import React from 'react';
import styled, { css } from 'styled-components';
import { hideChromeBrowserOutline } from './Styles';

export const phantomInputStyle = css`
  ${hideChromeBrowserOutline}
  background: none !important;
  border: none !important;
  outline: none !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type PhantomInputProps = Omit<React.CSSProperties, 'background' | 'border' | 'outline'> & {
  type?: React.HTMLInputTypeAttribute;
  tabIndex?: number;
  readOnly?: boolean;
  className?: string;
};

export const PhantomInput = React.forwardRef<HTMLInputElement, PhantomInputProps>(
  ({ className, readOnly, tabIndex, type, ...style }, ref) => {
    return (
      <StyledPhantomInput
        className={className}
        readOnly={readOnly}
        ref={ref}
        style={style}
        tabIndex={tabIndex}
        type={type}
      />
    );
  }
);

PhantomInput.displayName = 'PhantomInput';

const StyledPhantomInput = styled.input`
  ${phantomInputStyle}
`;
