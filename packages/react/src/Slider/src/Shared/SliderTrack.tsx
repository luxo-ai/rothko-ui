import { classes } from '@rothko-ui/system';
import React from 'react';

const baseSliderTrackClassnames = [
  'min-w-full',
  'relative',
  'flex',
  'items-center',
  'h-[0.5rem]',
  'bg-(--rothko-slider-track-background)',
  'rounded-[0.25rem]',
  'user-select-none',
  'z-0',
].join(' ');

export type SliderTrackDivProps = React.HTMLProps<HTMLDivElement> & {
  disabled?: boolean;
};

const SliderTrackDiv = ({ disabled, children, ...props }: SliderTrackDivProps) => {
  const baseClasses = classes(baseSliderTrackClassnames, disabled && 'opacity-75');
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...props} className={baseClasses}>
      {children}
    </div>
  );
};

export default SliderTrackDiv;
