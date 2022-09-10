import styled from 'styled-components';
import { EmSize, PercentSize, RemSize } from './types';

type Size = RemSize | EmSize | PercentSize | number;

export const MaxWidth = styled.div<{ maxW: Size }>`
  max-width: ${({ maxW }) => (typeof maxW === 'number' ? `${maxW}px` : maxW)};
`;

export const MinWidth = styled.div<{ minW: Size }>`
  min-width: ${({ minW }) => (typeof minW === 'number' ? `${minW}px` : minW)};
`;

export const WidthGeqOnly = styled.div<{ threshold: Size }>`
  @media only screen and (max-width: ${({ threshold: t }) =>
      typeof t === 'number' ? `${t}px` : t}) {
    display: none;
  }
`;

export const WidthLeqOnly = styled.div<{ threshold: Size }>`
  @media only screen and (min-width: ${({ threshold: t }) =>
      typeof t === 'number' ? `${t}px` : t}) {
    display: none;
  }
`;
