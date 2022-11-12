import styled, { css } from 'styled-components';
import Typography from './Typography';
export { BODY_FONT_FAMILY } from './constants';

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

export default Typography;
