import type { SVGAttributes } from 'react';
import React from 'react';

import type { Color } from '../../theme';
import useId from '../../library/hooks/useId';

const ANIMATION_KEY_TIMES = '0;0.5;1';

export type SkeletonBuilderProps = Omit<SVGAttributes<SVGElement>, 'role'> & {
  backgroundColor?: Color;
  children: React.ReactNode;
  foregroundColor?: Color;
  gradientProps?: SVGAttributes<SVGLinearGradientElement>;
  speed?: number;
};

const SkeletonBuilder = ({
  backgroundColor: bgColorProp,
  children,
  foregroundColor: fgColorProp,
  gradientProps,
  speed = 1.5,
  ...svgProps
}: SkeletonBuilderProps) => {
  const id = useId();

  const ariaId = `${id}-aria`;
  const clipId = `${id}-clip`;
  const gradientId = `${id}-gradient`;

  const backgroundColor = bgColorProp || 'var(--rothko-skeleton-background)';
  const foregroundColor = fgColorProp || 'var(--rothko-skeleton-foreground)';
  const animationDuration = `${speed}s`;

  return (
    <svg aria-labelledby={ariaId} role="img" {...svgProps}>
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

export default SkeletonBuilder;
