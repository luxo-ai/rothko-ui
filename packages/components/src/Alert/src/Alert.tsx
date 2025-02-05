import { classes, isString, scopedClasses } from '@rothko-ui/system';
import React from 'react';

import styles from './Alert.module.scss';
import type { RothkoKind, WithAria } from '@rothko-ui/system';
import { Paragraph } from '@rothko-ui/typography';

const sc = scopedClasses(styles);

type AriaAttributes =
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-live'
  | 'aria-hidden';

type AlertProps = {
  /**
   * The `id` attribute of the alert.
   * @type {string}
   */
  id?: string;
  /**
   * The content of the alert.
   * @type {React.ReactNode}
   * @required
   */
  children: React.ReactNode;
  /**
   * CSS class name(s).
   * @type {string}
   */
  className?: string;
  /**
   * The alert's semantic style.
   * @type {RothkoKind}
   * @default: 'danger'
   */
  kind?: RothkoKind;
  /**
   * The inline style for the alert.
   * @type {React.CSSProperties}
   */
  style?: React.CSSProperties;
  /**
   * The appearance style of the alert.
   * @type {'filled' | 'outline'}
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
        {isString(children) ? <Paragraph>{children}</Paragraph> : children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
