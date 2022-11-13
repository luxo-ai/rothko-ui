import styled from 'styled-components';
import { idkFn } from './Theme/theme';
import type { HexColor, RGBColor, RothkoKind } from './Theme/types';
import { isRothkoKind } from './Theme/types';
import type { EmSize, RemSize } from './types';

type HrProps = {
  color?: RothkoKind | HexColor | RGBColor;
  width?: number | RemSize | EmSize;
};

const Hr = styled.div<HrProps>`
  border-bottom-style: solid;
  border-bottom-width: ${({ width = 1 }) => (typeof width === 'number' ? `${width}px` : width)};
  border-color: ${({ color = '#000' }) => (isRothkoKind(color) ? idkFn(color) : color)};
  margin: 1.5rem 0;
`;

export default Hr;
