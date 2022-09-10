import styled, { css } from 'styled-components';
import * as Text from './Text';
export { BODY_FONT_FAMILY } from './common';
export { Text };

export const PaddedPage = styled.div`
  padding-top: 4rem;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-bottom: 1rem;
`;

export const hideBrowserOutline = css`
  outline: none;

  :active,
  :focus {
    outline: none;
  }
`;
