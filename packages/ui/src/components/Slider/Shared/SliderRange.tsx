import React from 'react';
import { scopedClasses as sc } from '@rothko-ui/utils';
import type { RothkoKind } from '../../../theme/types';
import styles from './SliderRange.modue.scss';

const scopedClasses = sc(styles);

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
      className={scopedClasses(
        'slider-range',
        kind && `slider-range--${kind}`,
        disabled && 'disabled'
      )}
    >
      {children}
    </div>
  );
};

export default SliderRange;
