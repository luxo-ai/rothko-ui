import styled, { css } from 'styled-components';

const ShadedBackdrop = styled.div<{ $show?: boolean }>`
  -webkit-backface-visibility: hidden;
  // shade the entire view in the background
  user-select: none;
  position: fixed;
  display: flex
  opacity: 0;

  ${({ $show }) =>
    $show
      ? css`
          opacity: 1;
          background-color: rgba(0, 0, 0, 0.5);
          inset: 0;
          z-index: 999999;

          -webkit-transition: opacity 80ms ease-in-out;
          -moz-transition: opacity 80ms ease-in-out;
          -ms-transition: opacity 80ms ease-in-out;
          transition: opacity 80ms ease-in-out;
        `
      : ''}
`;

export default ShadedBackdrop;
