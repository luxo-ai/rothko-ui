import styled from 'styled-components';

type GridSpanProps = {
  start: number;
  span: number;
};

const GridSpan = styled.div<GridSpanProps>`
  grid-column-start: ${({ start }) => start};
  grid-column-end: span ${({ span }) => span};
`;

export default GridSpan;
