import styled, { css } from 'styled-components';
import type { RothkoKind } from '../../../theme/types';
import { vuar } from '../../../library/utils/vuar';

const SliderRangeDiv = styled.div<{ kind?: RothkoKind; $disabled?: boolean }>`
  position: absolute;
  height: 0.25rem;
  margin: 0;
  border-radius: 2px;
  background: ${({ kind }) =>
    vuar({ kind, category: 'background', element: 'slider-range', fallback: '#3e4e94' })};

  overflow: hidden;
  user-select: none;
  z-index: 2;

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.75;
    `}
`;

export default SliderRangeDiv;
