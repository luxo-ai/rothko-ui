import styled from 'styled-components';
import { textStyle } from '../Text/Text';

export const FallbackText = styled.p<{ boxSize: string }>`
  ${textStyle}
  font-size: ${({ boxSize }) => `calc(${boxSize} * 0.28)`};
  color: white;
`;
