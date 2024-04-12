import { css } from 'styled-components';
import { baseInputStyle } from '../../Input/styles';

const searchBarWrapperStyle = css`
  -webkit-tap-highlight-color: transparent;
  ${baseInputStyle} // causing issues before, this helped
  position: relative;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  width: 100%;
  min-height: calc(1.5rem + 2 * 0.125rem + 2 * 0.5rem + 2 * 2px);

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 0.125rem;

  &.error:not(:focus):not(.focus) {
    background: var(--rothko-danger-transparent-100);
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.8;

    > input,
    button {
      cursor: not-allowed;
      opacity: 0.8;
    }
  }
`;

const searchBarInputStyle = css`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin: 0;

  &,
  > p,
  > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default {
  searchBarWrapperStyle,
  searchBarInputStyle,
};
