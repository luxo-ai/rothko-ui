import React from 'react';

import { classes, isString } from '@rothko-ui/utils';

import type { RothkoKind } from '../../theme/types';
import type { WithAriaHidden, WithAriaLabeling, WithAriaLive } from '../../types';
import Typography from '../Typography/Typography';
import styles from './Alert.module.scss';

type WithAria<T> = WithAriaHidden<WithAriaLabeling<WithAriaLive<T>>>;

type AlertProps = WithAria<{
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
}>;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
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
        className={classes(styles[`alert--${kind}`], styles[`alert--${appearance}`], className)}
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
