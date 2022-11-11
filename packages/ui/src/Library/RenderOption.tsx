import React from 'react';
import styled from 'styled-components';
import { Text } from '../Text';
import type { RenderOption } from './types';

export const DefaultRenderOption: RenderOption<any> = ({ option }) => (
  <OptText>{option.label}</OptText>
);

const OptText = styled(Text.bodySmall)`
  margin: 0;
  user-select: none;
`;
