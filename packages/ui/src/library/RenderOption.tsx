import React from 'react';
import styled from 'styled-components';
import Typography from '../components/Typography/Typography';
import type { Option } from './types';

const DefaultRenderOption = (props: { option: Pick<Option<unknown>, 'label'> }) => (
  <OptText>{props.option.label}</OptText>
);

const OptText = styled(Typography.bodySmall)`
  margin: 0;
  user-select: none;
`;

export default DefaultRenderOption;
