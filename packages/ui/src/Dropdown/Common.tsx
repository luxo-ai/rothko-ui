import styled from 'styled-components';
import { baseInputStyle } from '../Input';
import Typography, { hideBrowserOutline } from '../Typography';

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

  border: 0.125rem solid var(--color-border, #000);

  cursor: pointer;

  &.disabled {
    cursor: not-allowed;
    border-color: var(--basic-transparent-500);
  }

  &.empty {
    cursor: default;
  }

  &.minimal {
    background: transparent;
    border: none;
  }
`;

export const ControlContainer = styled.div`
  // position: absolute;
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

export const DropdownMenu = styled.div`
  &.open-reverse {
    bottom: calc(100% + 0.25rem);
    top: auto;
  }
  &:not(.open-reverse) {
    top: calc(100% + 0.25rem);
  }

  left: 0;
  max-height: 13rem;
  border-radius: 0.125rem;
  width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  z-index: 10;
  background-color: var(--color-background, #fff);
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  transition-duration: 0.1s;
  transition-property: transform;

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  & li {
    outline: none;

    &.group-header {
      padding: 1rem;
      cursor: default;
    }

    cursor: pointer;
    padding: 0.75rem 1rem;
    &:hover,
    &:focus,
    &.selected {
      background-color: var(--dropdown-background-selected, #eeeeee);
    }
  }
`;

// replace with just input text instead... if you can (just use textStyle etc)
export const TextContainerDiv = styled.div`
  ${hideBrowserOutline}
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

export const ItemText = styled(Typography.body)<{ placeHolder?: boolean }>`
  user-select: none;
  opacity: ${({ placeHolder }) => (placeHolder ? 0.75 : 1)};
`;

export const LabelText = styled(Typography.label).attrs({ light: true })`
  margin-bottom: 0.25rem;
`;
