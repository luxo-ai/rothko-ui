import type { FlattenSimpleInterpolation } from 'styled-components';
import { css } from 'styled-components';
import type { InputSize } from './types';
import typographyStyles from '../Typography/styles';
import { vuar } from '../../library/utils/vuar';

const sizeMap: Record<InputSize, FlattenSimpleInterpolation> = {
  s: css`
    padding: 0.35rem;
    font-size: 0.75rem;
  `,
  m: css`
    padding: 0.55rem;
    font-size: 1rem;
  `,
  l: css`
    padding: 0.65rem;
    font-size: 1.5rem;
  `,
};

export const baseInputStyle = css`
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  background: ${vuar({ element: 'input', category: 'background', fallback: '#fff' })};

  ${typographyStyles.body}
  color: ${vuar({ element: 'input', category: 'foreground', fallback: '#000' })};
  display: inline-block;
  box-sizing: border-box;
  line-height: 20px;

  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;

  border: none;
  border-radius: 0.125rem; // 2px

  ${Object.entries(sizeMap).map(
    ([key, value]) => css`
      &.inpt_size_${key} {
        ${value}
      }
    `
  )}

  &.error:not(:focus):not(.focus) {
    // background: ??
    // border-color: ??
  }

  :not(:disabled):not(.disabled) {
    &.focus:not(:disabled),
    &:focus:not(:disabled),
    &:active:not(:disabled) {
      outline: none;
      // border: 1.5px solid var(--info-500);
      // var(--info-500); // var(--info-300);
      border-color: ${vuar({
        category: 'border',
        fallback: '#000',
      })}; // var(--info-500); // var(--info-300);
    }
    :hover:not(:focus):not(.focus) {
    }
  }
  :disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
