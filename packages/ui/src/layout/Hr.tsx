import styled from 'styled-components';

import type { HexColor, RGBColor, RothkoKind } from '../theme';
import type { EmSize, RemSize } from '../types';
import { isRothkoKind } from '../library/utils';

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
