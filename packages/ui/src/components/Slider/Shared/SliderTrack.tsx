import React from 'react';
import { scopedClasses as sc } from '@rothko-ui/utils';
import styles from './SliderTrack.module.scss';

const scoppedClasses = sc(styles);

type SliderTrackDivProps = React.HTMLProps<HTMLDivElement> & {
  disabled?: boolean;
};

const SliderTrackDiv = ({ disabled, children, ...props }: SliderTrackDivProps) => {
  const baseClasses = scoppedClasses('slider-track', disabled && 'disabled');
  return (
    <div {...props} className={baseClasses}>
      {children}
    </div>
  );
};

export default SliderTrackDiv;
