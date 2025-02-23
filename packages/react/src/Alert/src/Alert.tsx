import { classes, isString } from '@rothko-ui/system';
import type { RothkoKind, WithAria } from '@rothko-ui/system';
import React from 'react';

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
   * Specifies the variant of the alert.
   * @type {'filled' | 'outline'}
   * @default 'filled'
   */
  variant?: 'filled' | 'outline';
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
      style = {},
      id,
      variant = 'filled',
    },
    ref
  ) => {
    const alertVarStyle = {
      '--alert-background': `var(--rothko-${kind})`,
      '--alert-foreground': `var(--rothko-${kind}-foreground)`,
    } as React.CSSProperties;

    const baseClasses = classes(
      'p-5', // 1.25rem
      // == text classes for children to inherit ==
      'rothko-font-regular',
      'rothko-paragraph-size-default',
      variant === 'filled' && 'bg-(--alert-background)',
      variant === 'filled' && 'text-(--alert-foreground)',
      variant === 'outline' && 'border',
      variant === 'outline' && 'border-solid',
      variant === 'outline' && 'border-(--alert-background)',
      variant === 'outline' && 'rothko-color-body'
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
        style={{ ...style, ...alertVarStyle }}
      >
        {isString(children) ? <div>{children}</div> : children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
