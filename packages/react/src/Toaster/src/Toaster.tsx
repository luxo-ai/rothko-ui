import type { SpringValue } from '@react-spring/web';
import { animated } from '@react-spring/web';
import { CloseOutline } from '@rothko-ui/icons';
import { vuar, PhantomButton, isString, scopedClasses, useId } from '@rothko-ui/system';
import type { WithAria, RothkoKind } from '@rothko-ui/system';
import { Paragraph } from '@rothko-ui/typography';
import React from 'react';

import styles from './Toaster.module.scss';
import type { ToastDetails } from './types';

const sc = scopedClasses(styles);

type AriaAttributes = 'aria-label' | 'aria-labelledby';

type AnimatedStyle = {
  height?: SpringValue<number>;
  life?: SpringValue<string>;
  opacity?: SpringValue<number>;
};

type ToastProps = Pick<ToastDetails, 'label' | 'content' | 'withLife'> & {
  /**
   * The `id` attribute of the toast.
   * @type {string}
   */
  id?: string;
  /**
   * The animated style for the toast.
   * @type {AnimatedStyle}
   */
  animatedStyle?: AnimatedStyle;
  /**
   * The toast's semantic style.
   * @type {RothkoKind}
   */
  kind?: RothkoKind;
  /**
   * Callback function called when the toast is closed.
   */
  onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * The style for the toast.
   * @type {React.CSSProperties}
   */
  style?: React.CSSProperties;
};

const Toast = React.forwardRef<HTMLDivElement, WithAria<ToastProps, AriaAttributes>>(
  (props, ref) => {
    const {
      id,
      animatedStyle: { life, ...animatedStyle } = {},
      content,
      kind,
      label,
      onClose,
      style = {},
      withLife,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    } = props;
    const labelId = useId();

    const iconColor = vuar({ kind, element: 'toast', category: 'foreground' });

    return (
      <animated.div
        className={sc('toast__animated-backdrop')}
        aria-hidden
        style={{ ...style, opacity: animatedStyle.opacity, height: animatedStyle.height }}
      >
        <div
          id={id}
          className={sc('toast', kind && `toast--${kind}`)}
          role="alert"
          aria-live={kind === 'danger' ? 'assertive' : 'polite'}
          aria-atomic
          aria-label={ariaLabel}
          aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
          ref={ref}
        >
          <div
            className={sc('toast__content-container', kind && `toast__content-container--${kind}`)}
          >
            {label &&
              (isString(label) ? (
                <Paragraph id={labelId} variant="bold">
                  {label}
                </Paragraph>
              ) : (
                <div id={labelId}>{label}</div>
              ))}
            {content && typeof content === 'string' ? (
              <Paragraph>{content}</Paragraph>
            ) : (
              <div>{content}</div>
            )}
          </div>
          <PhantomButton
            className={styles['toast__close-button']}
            aria-label="Close"
            onClick={onClose}
          >
            <CloseOutline fill={iconColor} aria-hidden width="1.125rem" height="1.125rem" />
          </PhantomButton>
        </div>
        {withLife && (
          <animated.div
            className={sc('toast__animated-life', kind && `toast__animated-life--${kind}`)}
            style={{ right: life }}
            aria-hidden
          />
        )}
      </animated.div>
    );
  }
);

Toast.displayName = 'Toast';

export default Toast;
