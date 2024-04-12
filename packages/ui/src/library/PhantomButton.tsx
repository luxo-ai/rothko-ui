import styled, { css } from 'styled-components';

type PhantomButtonProps = {
  $displayBlock?: boolean;
  $displayFlex?: boolean;
};

export const phantomButtonStyle = css<PhantomButtonProps>`
  // use font smoothing to make text/svgs clearer
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  // prevent double tap zoom on mobile
  touch-action: manipulation;
  user-select: none;
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  cursor: pointer;
  z-index: 1;

  ${({ $displayBlock }) =>
    $displayBlock &&
    css`
      display: block;
    `};

  ${({ $displayFlex }) =>
    $displayFlex &&
    css`
      display: flex;
    `};

  :disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const PhantomButton = styled.button<PhantomButtonProps>`
  ${phantomButtonStyle}
`;
