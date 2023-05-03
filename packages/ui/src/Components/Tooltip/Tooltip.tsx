import styled from 'styled-components';
import type { RemSize } from '../../types';

const distanceFromElement: RemSize = '1rem';
const arrowSize: RemSize = '0.3rem';

export const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

export const Tooltip = styled.div`
  position: absolute;
  border-radius: 0.25rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem;
  color: white;
  background: black;
  font-size: 14px;
  font-family: sans-serif;
  line-height: 1;
  z-index: 100;
  white-space: nowrap;

  &::before {
    content: ' ';
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: ${arrowSize};
    margin-left: -${arrowSize};
  }

  &.top {
    top: -${distanceFromElement};
    &::before {
      top: 100%;
      border-top-color: black;
    }
  }

  &.right {
    left: calc(100% + ${distanceFromElement});
    top: 50%;
    transform: translateX(0) translateY(-50%);

    &::before {
      left: calc(${arrowSize} * -1);
      top: 50%;
      transform: translateX(0) translateY(-50%);
      border-right-color: black;
    }
  }

  &.bottom {
    bottom: -${distanceFromElement};
    &::before {
      bottom: 100%;
      border-bottom-color: black;
    }
  }

  &.left {
    left: auto;
    right: calc(100% + ${distanceFromElement});
    top: 50%;
    transform: translateX(0) translateY(-50%);

    &::before {
      left: auto;
      right: calc(${arrowSize} * -2);
      top: 50%;
      transform: translateX(0) translateY(-50%);
      border-left-color: black;
    }
  }
`;
