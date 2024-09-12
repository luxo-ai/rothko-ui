import React from 'react';

import { scopedClasses } from '@rothko-ui/utils';

import type { RothkoSize } from '../../theme';
import styles from './Spinner.module.scss';

const sc = scopedClasses(styles);

type SimpleInlineSpinnerProps = {
  color?: string;
  size?: RothkoSize;
  style?: Omit<
    React.CSSProperties,
    'borderTopColor' | 'borderBottomColor' | 'borderRightColor' | 'borderLeftColor'
  >;
};

const InlineSpinner = ({ size = 'm', style = {}, color }: SimpleInlineSpinnerProps) => {
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

export default InlineSpinner;
