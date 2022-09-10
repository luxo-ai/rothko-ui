import clsx from 'clsx';
import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { CanColor, useKindTheme } from '../Theme/ThemeContext';
import { AemikoKind, GreyScale } from '../Theme/types';
import { SpinnerSize } from './types';

type SimpleInlineSpinnerProps = {
  size?: SpinnerSize;
  kind?: AemikoKind | GreyScale;
  className?: string;
  asText?: boolean;
};

export const SimpleInlineSpinner = ({
  className,
  asText,
  size = 'm',
  kind = 'info',
}: SimpleInlineSpinnerProps) => {
  const [themeColorer] = useKindTheme(kind);
  const baseClasses = clsx(`spinner-size-${size}`, className);
  return (
    <SpinnerContainer themeColorer={themeColorer} asText={asText} className={baseClasses}>
      loading...
    </SpinnerContainer>
  );
};

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

const SpinnerContainer = styled.div<CanColor & { asText?: boolean }>`
  display: inline-block;
  border-radius: 50%;

  ${Object.entries(spinnerSizeMap).map(
    ([key, value]) => css`
      &.spinner-size-${key} {
        ${value}
      }
    `
  )}

  text-indent: -9999em;

  border-top-color: ${({ themeColorer, asText }) =>
    asText ? themeColorer('text') : themeColorer()};
  border-right-color: ${({ themeColorer, asText }) =>
    asText ? themeColorer('text') : themeColorer()};
  border-bottom-color: ${({ themeColorer, asText }) =>
    asText ? themeColorer('text') : themeColorer()};
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
