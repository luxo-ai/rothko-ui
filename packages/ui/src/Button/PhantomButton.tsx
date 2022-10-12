import styled, { css } from 'styled-components';

// FOR INTERNAL USE, DON'T EXPORT FROM PACKAGE

export const phantomButtonStyle = css`
  -webkit-tap-highlight-color: transparent;
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  cursor: pointer;
  z-index: 1;
  &.db {
    display: block;
  }
`;

export const PhantomButton = styled.button`
  ${phantomButtonStyle}
`;
