/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';
import Typography from '../Typography';
import type { RenderOption } from './types';

export const DefaultRenderOption: RenderOption<any> = ({ option }) => (
  <OptText>{option.label}</OptText>
);

const OptText = styled(Typography.bodySmall)`
  margin: 0;
  user-select: none;
`;
