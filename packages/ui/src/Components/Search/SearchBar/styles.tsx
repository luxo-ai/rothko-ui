import { css } from 'styled-components';
import { hideBrowserOutline } from '../../Typography';
import { BODY_FONT_FAMILY } from '../../Typography/constants';

const searchBarWrapperStyle = css`
  -webkit-tap-highlight-color: transparent;
  ${hideBrowserOutline}
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: none;
  box-sizing: border-box;
  width: 100%;

  background: var(--basic-transparent-100);

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;

  font-family: ${BODY_FONT_FAMILY.light};
  line-height: 20px;

  border: 2px solid var(--color-border, #000); // basic-500; before
  border-radius: 0.125rem; // 2rem; //0.25rem;

  &.b-radius-bold {
    border-radius: 0.25rem;
  }

  &.error:not(:focus):not(.focus) {
    background: var(--danger-transparent-100);
    border-color: var(--danger-500);
  }

  &.focus:not(.disabled),
  &:focus:not(.disabled),
  &:active:not(.disabled) {
    outline: none;
    // border-color: var(--basic-800)
  }

  &.disabled {
    cursor: not-allowed;
    background: var(--basic-transparent-200);
    border-color: var(--basic-transparent-500);
    & > input,
    button {
      cursor: not-allowed;
      opacity: 0.8;
    }
  }
`;

export default {
  searchBarWrapperStyle,
};
