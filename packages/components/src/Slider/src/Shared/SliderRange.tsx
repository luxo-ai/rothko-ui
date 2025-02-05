import React from 'react';
import { scopedClasses } from '@rothko-ui/system';
import type { RothkoKind } from '@rothko-ui/system';
import styles from './SliderRange.modue.scss';

const sc = scopedClasses(styles);

export type SliderRangeDivProps = {
  kind?: RothkoKind;
  disabled?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const SliderRange = ({ kind, disabled, children, style }: SliderRangeDivProps) => {
  return (
    <div
      style={style}
      className={sc('slider-range', kind && `slider-range--${kind}`, disabled && 'disabled')}
    >
      {children}
    </div>
  );
};

export default SliderRange;
