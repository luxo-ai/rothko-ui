import React from 'react';
import styled, { css } from 'styled-components';

import { phantomButtonStyle } from '../PhantomButton';
import { ChevronDownOutline, CloseOutline } from '@rothko-ui/icons';

type ControlButtonProps = {
  rotateOnOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
  onClick: () => void;
  type?: 'clear' | 'indicator';
};

const Indicator = React.memo(() => {
  return <ChevronDownOutline aria-hidden width="1rem" height="1rem" />;
});

Indicator.displayName = 'Indicator';

const Clear = React.memo(() => {
  return <CloseOutline aria-hidden width="1rem" height="1rem" />;
});

Clear.displayName = 'Clear';

const ControlButton = ({ rotateOnOpen, open, disabled, onClick, type }: ControlButtonProps) => {
  const ariaLabel = (() => {
    if (type === 'clear') {
      return 'Clear Selection';
    }
    return open ? 'Close' : 'Open';
  })();

  return (
    <StyledControlButton
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onClick()}
      $rotateOnOpen={rotateOnOpen}
      $open={open}
    >
      {type === 'clear' ? <Clear /> : <Indicator />}
    </StyledControlButton>
  );
};

const StyledControlButton = styled.button.attrs({ type: 'button' })<{
  $rotateOnOpen?: boolean;
  $open?: boolean;
}>`
  ${phantomButtonStyle}
  display: flex;
  align-items: center;
  top: 0.51rem;
  right: 0.51rem;
  cursor: pointer;
  margin: calc(-1 * 2 * 0.51rem);
  height: auto;
  width: auto;
  padding: 0.51rem 1rem 0.51rem 1rem;
  // otherwise hidden under input padding and cursor pointer doesn't work
  z-index: 9;

  ${({ $rotateOnOpen, $open }) =>
    $rotateOnOpen &&
    css`
      transform: rotate(${($open && '180deg') || '0deg'});
      transition: transform 0.125s linear;
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export default ControlButton;
