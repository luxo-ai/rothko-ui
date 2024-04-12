import { css } from 'styled-components';
import type { RothkoKind } from '../theme';

export const unselectableStyle = css`
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
`;

// input, text elements (Chrome)
export const hideChromeBrowserOutline = css`
  outline: none;
  :active,
  :focus {
    outline: none;
  }
`;

export const textChildrenStyle = css`
  & > h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  code {
    color: var(--rothko-color, #000);
  }
`;

export const semanticTextChildrenStyle = css<{
  kind: RothkoKind;
}>`
  & > h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  code {
    color: ${({ kind }) => `var(--rothko-${kind}-color, #000)`};
  }
`;
