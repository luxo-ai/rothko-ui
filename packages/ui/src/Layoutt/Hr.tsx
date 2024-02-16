import styled from 'styled-components';
import type { HexColor, RGBColor, RothkoKind } from '../Theme';
import { isRothkoKind } from '../Theme';
import type { EmSize, RemSize } from '../types';

type HrProps = {
  color?: RothkoKind | HexColor | RGBColor;
  width?: number | RemSize | EmSize;
};

const Hr = styled.div<HrProps>`
  border-bottom-style: solid;
  border-bottom-width: ${({ width = 1 }) => (typeof width === 'number' ? `${width}px` : width)};
  border-color: ${({ color = '#000' }) =>
    isRothkoKind(color) ? `var(--rothko-${color}-500, #000)` : color};
  margin: 1.5rem 0;
`;

export default Hr;
