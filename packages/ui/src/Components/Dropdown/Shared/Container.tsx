import styled from 'styled-components';
import { baseInputStyle } from '../../Input/styles';
import { hideChromeBrowserOutline } from '../../../Library/Styles';

export const DropdownContainerDiv = styled.div`
  -webkit-tap-highlight-color: transparent;
  ${baseInputStyle} // causing issues before, this helped
  background: var(--rothko-basic-transparent-100);

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem 0.5rem 1rem;

  // prevent multi-select shrinkage
  // placeholder text (body) line-height + text margin + top padding + bottom padding + top border + bottom border
  min-height: calc(1.5rem + 2 * 0.125rem + 2 * 0.5rem + 2 * 2px);

  border: 0.125rem solid var(--rothko-color-border, #000);

  cursor: pointer;

  &.disabled {
    cursor: not-allowed;
    border-color: var(--rothko-basic-transparent-500);
  }

  &.empty {
    cursor: default;
  }

  &.minimal {
    background: transparent;
    border: none;
  }
`;

// replace with just input text instead... if you can (just use textStyle etc)
export const TextContainerDiv = styled.div`
  ${hideChromeBrowserOutline}
  font-size: 1rem;
  display: inline-block;
  // left padding of icon + right padding of icon + width of icon
  // padding-right: calc(1rem + 1rem + 16px);
  padding-right: 1rem;

  &.hidden {
    visibility: hidden;
  }

  &.disabled {
    opacity: 0.5;
  }
`;
