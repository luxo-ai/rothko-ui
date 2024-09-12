import React from 'react';

import { classes, isString, scopedClasses } from '@rothko-ui/utils';

import type { RothkoKind } from '../../theme/types';
import Typography from '../Typography/Typography';
import styles from './Alert.module.scss';
import type { WithAria } from '../../types';
import type { AriaAttributes } from './types';

const sc = scopedClasses(styles);

type AlertProps = {
  id?: string;
  /**
   * The content of the Alert component.
   */
  children: React.ReactNode;
  /**
   * The class name for the Alert component.
   */
  className?: string;
  /**
   * The kind of Alert component.
   * @default: 'danger'
   */
  kind?: RothkoKind;
  /**
   * The inline style for the Alert component.
   */
  style?: React.CSSProperties;
  /**
   * The appearance style of the Alert component.
   * @default 'filled'
   */
  appearance?: 'filled' | 'outline';
};

const Alert = React.forwardRef<HTMLDivElement, WithAria<AlertProps, AriaAttributes>>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      'aria-details': ariaDetails,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-live': ariaLive,
      'aria-hidden': ariaHidden,
      children,
      kind = 'danger',
      className,
      style,
      id,
      appearance = 'filled',
    },
    ref
  ) => {
    const baseClasses = sc('alert', `alert--${kind}`, `alert--${appearance}`);
    return (
      <div
        id={id}
        role="alert"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-details={ariaDetails}
        aria-hidden={ariaHidden}
        aria-live={ariaLive}
        className={classes(baseClasses, className)}
        ref={ref}
        style={style}
      >
        {isString(children) ? <Typography.body>{children}</Typography.body> : children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
