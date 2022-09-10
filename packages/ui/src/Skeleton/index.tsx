import React from 'react';
import { SkeletonBuilder, SkeletonBuilderProps } from './SkeletonBuilder';
export { SkeletonBuilder } from './SkeletonBuilder';

type Props = Pick<
  SkeletonBuilderProps,
  | 'speed'
  | 'foregroundColor'
  | 'backgroundColor'
  | 'height'
  | 'width'
  | 'gradientProps'
  | 'style'
  | 'className'
>;

export const SkeletonBox = ({
  speed,
  foregroundColor,
  backgroundColor,
  height,
  width,
  gradientProps,
  style,
  className,
}: Props) => (
  <SkeletonBuilder
    foregroundColor={foregroundColor}
    backgroundColor={backgroundColor}
    gradientProps={gradientProps}
    speed={speed}
    width={width || '100%'}
    height={height || '100%'}
    style={style}
    className={className}
    viewBox="0 0 1 1"
  >
    <rect width="1" height="1" />
  </SkeletonBuilder>
);

export const SkeletonBoxWithLabel = ({
  speed,
  foregroundColor,
  backgroundColor,
  height,
  width,
  gradientProps,
  style,
  className,
}: Props) => (
  <SkeletonBuilder
    foregroundColor={foregroundColor}
    backgroundColor={backgroundColor}
    gradientProps={gradientProps}
    speed={speed}
    width={width || '100%'}
    height={height || '100%'}
    style={style}
    className={className}
    viewBox="0 0 24 27"
  >
    <rect x="0" y="0" rx="0" ry="0" width="24" height="24" />
    <rect x="0" y="24.5" rx="0.5" ry="0.5" width="50%" height="1" />
    <rect x="0" y="26" rx="0.5" ry="0.5" width="30%" height="1" />
    <rect x="0" y="0" rx="0" ry="0" width="24" height="24" />
  </SkeletonBuilder>
);
