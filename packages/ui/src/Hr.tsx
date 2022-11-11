import styled from 'styled-components';
import type { HexColor, RGBColor } from './Theme/types';

type HrProps = {
  lineColor?: HexColor | RGBColor;
};

export const Hr = styled.div<HrProps>`
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: ${({ lineColor = '#CCCCCC' }) => lineColor};
  margin: 1.5rem 0;
`;
