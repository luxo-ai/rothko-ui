import styled from 'styled-components';
import { baseInputStyle } from '../components/Input/styles';
import Typography from '../components/Typography/Typography';

/* ATTN: ~~ DO NOT EXPORT IN index.tsx (for internal use only) ~~ */

export const ShadedBackdrop = styled.div`
  -webkit-backface-visibility: hidden;
  // shade the entire view in the background
  user-select: none;
  position: fixed;
  display: flex
  opacity: 0;

  &.backdrop-open {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.5);
    inset: 0;
    z-index: 999999;

    -webkit-transition: opacity 80ms ease-in-out;
    -moz-transition: opacity 80ms ease-in-out;
    -ms-transition: opacity 80ms ease-in-out;
    transition: opacity 80ms ease-in-out;
  }
`;

export const DropdownContainerDiv = styled.div`
  -webkit-tap-highlight-color: transparent;
  ${baseInputStyle} // causing issues before, this helped

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem 0.5rem 1rem;

  // prevent multi-select shrinkage
  // placeholder text (body) line-height + text margin + top padding + bottom padding + top border + bottom border
  min-height: calc(1.5rem + 2 * 0.125rem + 2 * 0.5rem + 2 * 2px);

  border: 0.125rem solid var(--rothko-border, #000);

  cursor: pointer;

  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.empty {
    cursor: default;
  }

  &.minimal {
    background: transparent;
    border: none;
  }
`;

export const MenuBase = styled.div`
  width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  background-color: var(--rothko-dropdown-background, #fff);

  &:not(.pop-out) {
    position: absolute;
    top: calc(100% + 0.25rem);
    left: 0;

    &.open-reverse {
      bottom: calc(100% + 0.25rem);
      top: auto;
    }

    border-radius: 0.125rem;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  }

  &.pop-out {
    // margin: 0 0 2rem 0;
    margin: 0;
    height: 100%;
    max-height: 100vh;
  }

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  & li {
    outline: none;
    cursor: pointer;
    padding: 0.75rem 1rem;

    &:hover,
    &:focus,
    &.selected {
      background-color: var(--rothko-dropdown-option-background_selected, #eee);
    }
  }
`;

export const ItemText = styled(Typography.inlineBody)<{ placeHolder?: boolean }>`
  user-select: none;
  opacity: ${({ placeHolder }) => (placeHolder ? 0.75 : 1)};
`;

export const LabelText = styled(Typography.label).attrs({ light: true })`
  margin-bottom: 0.25rem;
`;
