import type { FlattenSimpleInterpolation } from 'styled-components';
import { css } from 'styled-components';
import { BODY_FONT_FAMILY } from '../Typography';
import type { InputSize } from './types';
import type { TextProps } from '../Typography/Typography';
import { textStyle } from '../Typography/Typography';

const sizeMap: Record<InputSize, FlattenSimpleInterpolation> = {
  s: css`
    padding: 0.35rem 0.35rem;
    font-size: 0.75rem;
  `,
  m: css`
    padding: 0.5rem 0.5rem;
    font-size: 1rem;
  `,
  l: css`
    padding: 0.65rem 0.65rem;
    font-size: 1.5rem;
  `,
};

export const baseInputStyle = css`
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  background: var(--basic-transparent-100); // basic-200

  font-family: ${BODY_FONT_FAMILY.regular};
  display: inline-block;
  box-sizing: border-box;
  line-height: 20px;
  // 0.125rem
  border: 1px solid var(--color-border, #000); // #8a8a8a; // var(--basic-500);
  border-radius: 0.125rem; // 2px

  ${Object.entries(sizeMap).map(
    ([key, value]) => css`
      &.inpt_size_${key} {
        ${value}
      }
    `
  )}

  &.error:not(:focus):not(.focus) {
    background: var(--danger-transparent-100);
    border-color: var(--danger-500);
  }

  :not(:disabled) {
    &.focus:not(.disabled),
    &:focus:not(.disabled),
    &:active:not(.disabled) {
      outline: none;
      // border: 1.5px solid var(--info-500);
      border-color: var(--color-border, #000); // var(--info-500); // var(--info-300);
    }
    :hover:not(:focus):not(.focus) {
      // background: var(--basic-300);
    }
  }
  .disabled,
  :disabled {
    cursor: not-allowed;
    background: var(--basic-transparent-200);
    border-color: var(--basic-transparent-500);
  }
`;
