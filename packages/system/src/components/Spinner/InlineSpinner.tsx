import React from 'react';

import styles from './Spinner.module.scss';
import type { RothkoSize } from '../../types';
import { scopedClasses } from '../../utils/classes';

const sc = scopedClasses(styles);

type SimpleInlineSpinnerProps = {
  color?: string;
  size?: RothkoSize;
  style?: Omit<
    React.CSSProperties,
    'borderTopColor' | 'borderBottomColor' | 'borderRightColor' | 'borderLeftColor'
  >;
};

export const InlineSpinner = ({ size = 'm', style = {}, color }: SimpleInlineSpinnerProps) => {
  const borderColorStyle = color
    ? {
        borderTopColor: color,
        borderRightColor: color,
        borderBottomColor: color,
      }
    : {};
  return (
    <span
      aria-label="Loading"
      role="progressbar"
      className={sc('inline-spinner', `inline-spinner--${size}`)}
      style={{ ...style, ...borderColorStyle }}
    >
      loading...
    </span>
  );
};
