import type { SVGAttributes } from 'react';
import React, { useRef } from 'react';
import uuid from 'uuid';
import { useTheme } from '../Theme';
import type { Color } from '../Theme/types';

const ANIMATION_KEY_TIMES = '0;0.5;1';

export type SkeletonBuilderProps = {
  backgroundColor?: Color;
  foregroundColor?: Color;
  speed?: number;
  gradientProps?: SVGAttributes<SVGLinearGradientElement>;
  children: React.ReactNode;
} & SVGAttributes<SVGElement>;

export const SkeletonBuilder = ({
  backgroundColor: bgColorProp,
  foregroundColor: fgColorProp,
  speed = 1.5,
  gradientProps,
  children,
  ...svgProps
}: SkeletonBuilderProps) => {
  const { theme } = useTheme();
  const uuidRef = useRef(uuid.v4());

  const ariaId = `${uuidRef.current}-aria`;
  const clipId = `${uuidRef.current}-clip`;
  const gradientId = `${uuidRef.current}-gradient`;

  const backgroundColor = bgColorProp || theme['basic-300'];
  const foregroundColor = fgColorProp || theme['basic-200'];
  const animationDuration = `${speed}s`;

  return (
    <svg {...svgProps} aria-labelledby={ariaId} role="img">
      <title id={ariaId}>Loading...</title>
      <rect
        role="presentation"
        x="0"
        y="0"
        width="100%"
        height="100%"
        clipPath={`url(#${clipId})`}
        fill={`url(#${gradientId})`}
      />
      <defs>
        <clipPath id={clipId}>{children}</clipPath>
        <linearGradient {...gradientProps} id={gradientId}>
          <stop offset="0%" stopColor={backgroundColor}>
            <animate
              attributeName="offset"
              values="-3;-3;1"
              repeatCount="indefinite"
              keyTimes={ANIMATION_KEY_TIMES}
              dur={animationDuration}
            />
          </stop>
          <stop offset="50%" stopColor={foregroundColor}>
            <animate
              attributeName="offset"
              values="-1.5;-1.5;1.5"
              repeatCount="indefinite"
              keyTimes={ANIMATION_KEY_TIMES}
              dur={animationDuration}
            />
          </stop>
          <stop offset="100%" stopColor={backgroundColor}>
            <animate
              attributeName="offset"
              repeatCount="indefinite"
              values="0;0;1.5"
              keyTimes={ANIMATION_KEY_TIMES}
              dur={animationDuration}
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};
