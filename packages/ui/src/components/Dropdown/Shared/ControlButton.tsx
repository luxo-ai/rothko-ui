import styled, { css } from 'styled-components';
import { phantomButtonStyle } from '../../../library/PhantomButton';

type ControlButtonProps = {
  $rotateOnOpen?: boolean;
  $open?: boolean;
};

const ControlButton = styled.button.attrs({ type: 'button' })<ControlButtonProps>`
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

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default ControlButton;
