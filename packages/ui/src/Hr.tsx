import styled from 'styled-components';
import { idkFn } from './Theme/themeV2';
import type { HexColor, RGBColor, RothkoKind } from './Theme/types';
import type { EmSize, RemSize } from './types';

type HrProps = {
  kind?: RothkoKind;
  lineColor?: HexColor | RGBColor;
  width?: number | RemSize | EmSize;
};

const Hr = styled.div<HrProps>`
  border-bottom-style: solid;
  border-bottom-width: ${({ width = 1 }) => (typeof width === 'number' ? `${width}px` : width)};
  border-color: ${({ kind, lineColor = '#000' }) => (kind ? idkFn(kind) : lineColor)};
  margin: 1.5rem 0;
`;

export default Hr;
