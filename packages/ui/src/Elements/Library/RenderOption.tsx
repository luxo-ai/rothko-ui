import React from 'react';
import styled from 'styled-components';
import { Text } from '../../Text';
import { RenderOption } from '../Library/types';

export const DefaultRenderOption: RenderOption<any> = ({ option }) => (
  <OptText>{option.label}</OptText>
);

const OptText = styled(Text.bodySmall)`
  user-select: none;
`;
