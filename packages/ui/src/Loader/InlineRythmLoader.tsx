import clsx from 'clsx';
import * as React from 'react';

import type { FlattenSimpleInterpolation } from 'styled-components';
import styled, { css } from 'styled-components';
import { idkFn } from '../Theme/themeV2';
import type { KindProps, RothkoKind } from '../Theme/types';
import { generateCssAnimation } from '../utils/domUtils/style';
import type { SpinnerSize } from './types';

type RythmLoaderProps = {
  asText?: boolean;
  className?: string;
  kind?: RothkoKind;
  size?: SpinnerSize;
  speedMultiplier?: number;
  style?: React.CSSProperties;
};

const InlineRythmLoader = ({
  asText,
  className,
  kind,
  size = 'm',
  speedMultiplier,
  style,
}: RythmLoaderProps) => {
  return (
    <RythmSpan style={style} className={clsx(`rythm-loader-size-${size}`, className)}>
      <RythmDotSpan asText={asText} kind={kind} speedMultiplier={speedMultiplier} off={1} />
      <RythmDotSpan asText={asText} kind={kind} speedMultiplier={speedMultiplier} off={2} />
      <RythmDotSpan asText={asText} kind={kind} speedMultiplier={speedMultiplier} off={3} />
    </RythmSpan>
  );
};

const spinnerSizeMap: Record<SpinnerSize, FlattenSimpleInterpolation> = {
  s: css`
    width: calc(3 * 0.25rem);
    height: calc(3 * 0.25rem);
    column-gap: 0.25rem;
  `,
  m: css`
    width: calc(3 * 0.5rem);
    height: calc(3 * 0.5rem);
    column-gap: 0.5rem;
  `,
  l: css`
    width: calc(3 * 1rem);
    height: calc(3 * 1rem);
    column-gap: 0.5rem;
  `,
};

const RythmSpan = styled.span`
  display: inline-flex;
  flex-direction: row;

  ${Object.entries(spinnerSizeMap).map(
    ([key, value]) => css`
      &.rythm-loader-size-${key} {
        ${value}
      }
    `
  )}

  & > span {
    flex: 1 0 auto;
  }
`;

type RythmDotSpanProps = KindProps & {
  off: number;
  speedMultiplier?: number;
  asText?: boolean;
};

const animation = generateCssAnimation(
  'rythm-loader-animation',
  '50% {transform: scale(0.75);opacity: 0.2} 100% {transform: scale(1);opacity: 1}'
);

const RythmDotSpan = styled.span<RythmDotSpanProps>`
  width: 100%;
  height: 100%;
  border-radius: 100%; // 0.125rem;

  background-color: ${({ kind, asText }) => {
    if (!kind) return '#000';
    return asText ? idkFn(kind, 'text') : idkFn(kind);
  }};

  animation-fill-mode: both;
  animation: ${animation} ${({ speedMultiplier = 1 }) => 0.7 / speedMultiplier}s
    ${({ off, speedMultiplier = 1 }) => (off % 2 ? 0 : 0.35 / speedMultiplier)}s infinite linear;
`;

export default InlineRythmLoader;
