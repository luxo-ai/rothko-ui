import styled from 'styled-components';

/* ATTN: ~~ DO NOT EXPORT IN index.tsx (for internal use only) ~~ */

export const ShadedBackdrop = styled.div`
  // shade the entire view in the background
  user-select: none;
  position: fixed;
  opacity: 0;
  &.backdrop-open {
    opacity: 1;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    inset: 0;
    z-index: 999;

    -webkit-transition: opacity 70ms linear;
    -moz-transition: opacity 70ms linear;
    -ms-transition: opacity 70ms linear;
    transition: opacity 70ms linear;
  }
`;
