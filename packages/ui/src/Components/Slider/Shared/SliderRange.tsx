import styled from 'styled-components';
import type { KindProps } from '../../../Theme/types';

const SliderRangeDiv = styled.div<KindProps>`
  position: absolute;
  height: 0.25rem;
  margin: 0;
  border-radius: 2px;
  background: ${({ kind }) =>
    kind ? `var(--color-${kind}-500, --color-background, #000)` : `var(--color-background, #000)`};
  overflow: hidden;
  user-select: none;
  z-index: 2;
`;

export default SliderRangeDiv;
