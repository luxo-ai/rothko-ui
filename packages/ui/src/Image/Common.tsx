import styled from 'styled-components';
import Typography from '../Typography/Typography';

export const FallbackText = styled(Typography.body)<{ boxSize: string }>`
  font-size: ${({ boxSize }) => `calc(${boxSize} * 0.28)`};
  color: white;
`;
