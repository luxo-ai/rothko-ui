import React from 'react';
import styled, { css } from 'styled-components';
import type { FlattenSimpleInterpolation } from 'styled-components';

import type { RothkoSize } from '../theme';
import { vuar } from './utils/vuar';

type SimpleInlineSpinnerProps = {
  color?: string;
  size?: RothkoSize;
  style?: React.CSSProperties;
};

const InlineSpinner = ({ size = 'm', style, color }: SimpleInlineSpinnerProps) => (
  <SpinnerSpan $color={color} $size={size} aria-label="Loading" role="progressbar" style={style}>
    loading...
  </SpinnerSpan>
);

const spinnerSizeMap: Record<RothkoSize, FlattenSimpleInterpolation> = {
  xs: css`
    width: 0.875rem;
    height: 0.875rem;
    border-width: 0.125rem;
  `,
  s: css`
    width: 0.875rem;
    height: 0.875rem;
    border-width: 0.125rem;
  `,
  m: css`
    width: 2.25rem;
    height: 2.25rem;
    border-width: 0.5rem;
  `,
  l: css`
    width: 5rem;
    height: 5rem;
    border-width: 1rem;
  `,
};

const SpinnerSpan = styled.span<{ $color?: string; $size: RothkoSize }>`
  display: inline-block;
  border-radius: 50%;
  text-indent: -9999em;

  ${({ $size }) => {
    return spinnerSizeMap[$size];
  }}

  border-top-color: ${({ $color }) => {
    return $color || vuar({ category: 'foreground' });
  }};

  border-right-color: ${({ $color }) => {
    return $color || vuar({ category: 'foreground' });
  }};

  border-bottom-color: ${({ $color }) => {
    return $color || vuar({ category: 'foreground' });
  }};

  border-left-color: transparent;
  border-style: solid;

  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  -webkit-animation: load 1.1s infinite linear;
  animation: load 1.1s infinite linear;

  @-webkit-keyframes load {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export default InlineSpinner;
