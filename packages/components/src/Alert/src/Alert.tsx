import { classes, isString } from '@rothko-ui/system';
import React from 'react';

import type { RothkoKind, WithAria } from '@rothko-ui/system';

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

const rothkoKindBg = {
  danger: 'bg-(--rothko-danger)',
  info: 'bg-(--rothko-info)',
  success: 'bg-(--rothko-success)',
  warning: 'bg-(--rothko-warning)',
  primary: 'bg-(--rothko-primary)',
  secondary: 'bg-(--rothko-secondary)',
} as const;

const rothkoKindFg = {
  danger: 'text-(--rothko-danger-foreground)',
  info: 'text-(--rothko-info-foreground)',
  success: 'text-(--rothko-success-foreground)',
  warning: 'text-(--rothko-warning-foreground)',
  primary: 'text-(--rothko-primary-foreground)',
  secondary: 'text-(--rothko-secondary-foreground)',
} as const;

const rothkoKindBorder = {
  danger: 'border-(--rothko-danger)',
  info: 'border-(--rothko-info)',
  success: 'border-(--rothko-success)',
  warning: 'border-(--rothko-warning)',
  primary: 'border-(--rothko-primary)',
  secondary: 'border-(--rothko-secondary)',
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
    const baseClasses = classes(
      'p-5', // 1.25rem
      // == text classes for children to inherit ==
      'font-rothko-regular',
      'font-size-(--rothko-font-size-body)',
      'line-height-(--rothko-line-height-body)',
      appearance === 'filled' && rothkoKindBg[kind],
      appearance === 'filled' && rothkoKindFg[kind],
      appearance === 'outline' && 'border',
      appearance === 'outline' && 'border-solid',
      appearance === 'outline' && rothkoKindBorder[kind],
      appearance === 'outline' && 'text-(--rothko-typography-body-color)'
    );
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
        {isString(children) ? <div>{children}</div> : children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
