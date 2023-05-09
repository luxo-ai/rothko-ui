import type { SVGAttributes } from 'react';
import React, { useRef } from 'react';
import uuid from 'uuid';
import type { Color } from '../../Theme';

const ANIMATION_KEY_TIMES = '0;0.5;1';

export type SkeletonBuilderProps = SVGAttributes<SVGElement> & {
  backgroundColor?: Color;
  children: React.ReactNode;
  foregroundColor?: Color;
  gradientProps?: SVGAttributes<SVGLinearGradientElement>;
  speed?: number;
};

export const SkeletonBuilder = ({
  backgroundColor: bgColorProp,
  children,
  foregroundColor: fgColorProp,
  gradientProps,
  speed = 1.5,
  ...svgProps
}: SkeletonBuilderProps) => {
  const uuidRef = useRef(uuid.v4());

  const ariaId = `${uuidRef.current}-aria`;
  const clipId = `${uuidRef.current}-clip`;
  const gradientId = `${uuidRef.current}-gradient`;

  const backgroundColor = bgColorProp || 'var(--rothko-basic-300)';
  const foregroundColor = fgColorProp || 'var(--rothko-basic-200)';
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
