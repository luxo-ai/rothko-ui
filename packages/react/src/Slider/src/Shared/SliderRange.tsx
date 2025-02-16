import { classes } from '@rothko-ui/system';
import type { RothkoKind } from '@rothko-ui/system';
import React from 'react';

export type SliderRangeDivProps = {
  kind?: RothkoKind;
  disabled?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const SliderRange = ({ kind, disabled, children, style = {} }: SliderRangeDivProps) => {
  const sliderRangeVarStyle = {
    '--slider-range-background': kind
      ? `var(--rothko-${kind})`
      : 'var(--rothko-slider-range-background)',
  } as React.CSSProperties;

  const sliderRangeBaseStyle = {
    borderRadius: 'inherit', // variables.$sliderBorderRadius;
  };

  const sliderRangeClassnames = classes(
    'absolute',
    'h-full',
    'bg-(--slider-range-background)',
    'overflow-hidden',
    'user-select-none',
    'z-2',
    disabled && 'opacity-75'
  );

  return (
    <div
      style={{ ...style, ...sliderRangeVarStyle, ...sliderRangeBaseStyle }}
      className={sliderRangeClassnames}
    >
      {children}
    </div>
  );
};

export default SliderRange;
