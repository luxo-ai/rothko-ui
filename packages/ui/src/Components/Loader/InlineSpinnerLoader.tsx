import clsx from 'clsx';
import React from 'react';
import type { FlattenSimpleInterpolation } from 'styled-components';
import styled, { css } from 'styled-components';
import type { KindProps, RothkoKind } from '../../Theme';
import type { SpinnerSize } from './types';

type SimpleInlineSpinnerProps = {
  className?: string;
  kind?: RothkoKind;
  size?: SpinnerSize;
  style?: React.CSSProperties;
};

const InlineSpinnerLoader = ({ className, kind, size = 'm', style }: SimpleInlineSpinnerProps) => (
  <SpinnerSpan style={style} kind={kind} className={clsx(`spinner-size-${size}`, className)}>
    loading...
  </SpinnerSpan>
);

const spinnerSizeMap: Record<SpinnerSize, FlattenSimpleInterpolation> = {
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

type SpinnerSpanProps = KindProps;

const SpinnerSpan = styled.span<SpinnerSpanProps>`
  border-radius: 50%;
  text-indent: -9999em;

  ${Object.entries(spinnerSizeMap).map(
    ([key, value]) => css`
      &.spinner-size-${key} {
        ${value}
      }
    `
  )}

  border-top-color: ${({ kind }) =>
    kind ? `var(--rothko-${kind}-500, #000)` : 'var(--rothko-color, #000)'};

  border-right-color: ${({ kind }) =>
    kind ? `var(--rothko-${kind}-500, #000)` : 'var(--rothko-color, #000)'};

  border-bottom-color: ${({ kind }) =>
    kind ? `var(--rothko-${kind}-500, #000)` : 'var(--rothko-color, #000)'};

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

export default InlineSpinnerLoader;
