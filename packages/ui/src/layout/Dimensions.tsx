import styled from 'styled-components';
import type { EmSize, PercentSize, RemSize } from '../types';

type Size = RemSize | EmSize | PercentSize | number;

export const MaxWidth = styled.div<{ $maxWidth: Size }>`
  max-width: ${({ $maxWidth }) => (typeof $maxWidth === 'number' ? `${$maxWidth}px` : $maxWidth)};
`;

export const MinWidth = styled.div<{ $minWidth: Size }>`
  min-width: ${({ $minWidth: minW }) => (typeof minW === 'number' ? `${minW}px` : minW)};
`;

export const WidthGeqOnly = styled.div<{ $threshold: Size }>`
  @media only screen and (max-width: ${({ $threshold }) =>
      typeof $threshold === 'number' ? `${$threshold}px` : $threshold}) {
    display: none;
  }
`;

export const WidthLeqOnly = styled.div<{ $threshold: Size }>`
  @media only screen and (min-width: ${({ $threshold }) =>
      typeof $threshold === 'number' ? `${$threshold}px` : $threshold}) {
    display: none;
  }
`;
