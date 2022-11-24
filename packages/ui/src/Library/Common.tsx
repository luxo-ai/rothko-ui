import styled from 'styled-components';

/* ATTN: ~~ DO NOT EXPORT IN index.tsx (for internal use only) ~~ */

export const ShadedBackdrop = styled.div`
  -webkit-backface-visibility: hidden;
  // shade the entire view in the background
  user-select: none;
  position: fixed;
  display: flex
  opacity: 0;

  &.backdrop-open {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.5);
    inset: 0;
    z-index: 999999;

    -webkit-transition: opacity 70ms linear;
    -moz-transition: opacity 70ms linear;
    -ms-transition: opacity 70ms linear;
    transition: opacity 70ms linear;
  }
`;
