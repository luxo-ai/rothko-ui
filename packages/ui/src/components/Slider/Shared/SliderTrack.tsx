import styled, { css } from 'styled-components';
import { vuar } from '../../../library/utils/vuar';

const SliderTrackDiv = styled.div<{ $disabled?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 1px;
  background: ${vuar({ element: 'slider-track', category: 'background', fallback: '#000' })};
  border-radius: 2px;
  user-select: none;
  z-index: 0;
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.75;
    `}
`;

export default SliderTrackDiv;
