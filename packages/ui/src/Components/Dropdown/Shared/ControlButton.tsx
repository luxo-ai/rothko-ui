import styled from 'styled-components';
import { PhantomButton } from '../../../Library/PhantomButton';

const ControlButton = styled(PhantomButton)`
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

  &:not(.open) {
    transform: rotate(0deg);
    transition: transform 0.125s linear;
  }

  &.open {
    transform: rotate(180deg);
    transition: transform 0.125s linear;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default ControlButton;
