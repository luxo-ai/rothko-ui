import styled from 'styled-components';
import { CanColor, ThemedElement } from '../Theme';
import { EmSize, PercentSize, RemSize } from '../types';

export type SliderWidth = RemSize | EmSize | PercentSize;

export const SliderContainer = styled.div<{ mw: SliderWidth; nw: SliderWidth }>`
  height: 100%;
  width: 100%;
  min-width: ${({ nw }) => nw};
  max-width: ${({ mw }) => mw};
`;

export const SliderTrack = styled.div<ThemedElement>`
  height: 0.3rem;
  background: ${({ aemikoTheme }) => aemikoTheme['basic-500']};
  border-radius: 3px;
  user-select: none;
  z-index: 0;
`;

export const SliderRange = styled.div<CanColor>`
  height: 100%;
  margin: 0;
  border-radius: 3px;
  background: ${({ themeColorer }) => themeColorer()};
  overflow: hidden;
  user-select: none;
  z-index: 2;
`;
