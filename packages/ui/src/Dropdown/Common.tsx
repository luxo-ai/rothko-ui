/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { baseInputStyle } from '../Input';
import Typography, { hideBrowserOutline } from '../Typography';

export const DropdownContainer = styled.div`
  ${baseInputStyle} // causing issues before, this helped
  -webkit-tap-highlight-color: transparent;
  // background: red;
  position: relative;
  padding: 0.5rem 1rem 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  min-height: 42px;

  &.disabled {
    cursor: not-allowed;
  }

  &.empty {
    cursor: default;
  }

  &.minimal {
    background: transparent;
    border: none;
  }

  // display: block;
`;

export const PhantomInput = styled.input`
  ${hideBrowserOutline}
  background: none !important;
  border: none !important;
  outline: none !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 2;
  // left padding of icon + right padding of icon + width of icon
  padding: 0.5rem calc(1rem + 1rem + 16px) 0.5rem 1rem;
  position: absolute;
  top: 0;
  left: 0;
  cursor: text;
  width: 100%;
  height: 100%;
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
  border-radius: 0.25rem;
  width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  z-index: 10;
  background-color: white;
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

    &.option {
      cursor: pointer;
      padding: 0.75rem 1rem;
      &:hover,
      &:focus,
      &.selected {
        background-color: rgb(238, 238, 238);
      }
    }
  }
`;

// replace with just input text instead... if you can (just use textStyle etc)
export const TextContainer = styled.div`
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

export const ItemText = styled(Typography.body)`
  user-select: none;
  &.placeholder {
    opacity: 0.75;
  }
`;

export const LabelText = styled(Typography.label).attrs({ light: true })`
  margin-bottom: 0.25rem;
`;
