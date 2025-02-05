import React from 'react';
import { scopedClasses } from '@rothko-ui/system';
import styles from './SliderTrack.module.scss';

const sc = scopedClasses(styles);

export type SliderTrackDivProps = React.HTMLProps<HTMLDivElement> & {
  disabled?: boolean;
};

const SliderTrackDiv = ({ disabled, children, ...props }: SliderTrackDivProps) => {
  const baseClasses = sc('slider-track', disabled && 'disabled');
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...props} className={baseClasses}>
      {children}
    </div>
  );
};

export default SliderTrackDiv;
