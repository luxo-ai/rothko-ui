import styled from 'styled-components';
import type { SliderWidth } from '../types';

type SliderContainerDivProps = {
  $maxWidth: SliderWidth;
  $minWidth: SliderWidth;
};

export const SliderContainerDiv = styled.div<SliderContainerDivProps>`
  height: 100%;
  width: 100%;
  min-width: ${({ $minWidth }) => (typeof $minWidth === 'number' ? `${$minWidth}px` : $minWidth)};
  max-width: ${({ $maxWidth }) => (typeof $maxWidth === 'number' ? `${$maxWidth}px` : $maxWidth)};
`;

export const SliderLegendContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;
