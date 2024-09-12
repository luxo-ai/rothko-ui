import React from 'react';
import { scopedClasses } from '@rothko-ui/utils';
import type { RothkoKind } from '../../../theme/types';
import styles from './SliderRange.modue.scss';

const sc = scopedClasses(styles);

type SliderRangeDivProps = {
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
