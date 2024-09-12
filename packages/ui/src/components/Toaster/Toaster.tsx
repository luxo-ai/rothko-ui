import type { SpringValue } from '@react-spring/web';
import { animated } from '@react-spring/web';
import React from 'react';

import { CloseOutline } from '@rothko-ui/icons';
import { isString, scopedClasses } from '@rothko-ui/utils';

import type { RothkoKind } from '../../theme';
import Typography from '../Typography/Typography';
import type { ToastDetails } from './types';
import useId from '../../library/hooks/useId';
import styles from './Toaster.module.scss';
import { vuar } from '../../library/utils/vuar';
import type { WithAria } from '../../types';

const sc = scopedClasses(styles);

type AriaAttributes = 'aria-label' | 'aria-labelledby';

type AnimatedStyle = {
  height?: SpringValue<number>;
  life?: SpringValue<string>;
  opacity?: SpringValue<number>;
};

type ToastProps = Pick<ToastDetails, 'label' | 'content' | 'withLife'> & {
  id?: string;
  /**
   * The animated style for the toast.
   */
  animatedStyle?: AnimatedStyle;
  /**
   * The kind of toast.
   */
  kind?: RothkoKind;
  /**
   * Callback function called when the toast is closed.
   * @param e - The mouse event.
   */
  onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * The style for the toast.
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
          className={sc('toast', kind)}
          role="alert"
          aria-live={kind === 'danger' ? 'assertive' : 'polite'}
          aria-atomic
          aria-label={ariaLabel}
          aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
          ref={ref}
        >
          <div className={sc('toast__content-container', kind)}>
            {label &&
              (isString(label) ? (
                <Typography.body id={labelId} bold>
                  {label}
                </Typography.body>
              ) : (
                <div id={labelId}>{label}</div>
              ))}
            {content && typeof content === 'string' ? (
              <Typography.body>{content}</Typography.body>
            ) : (
              <div>{content}</div>
            )}
          </div>
          <button className={styles['toast__close-button']} aria-label="Close" onClick={onClose}>
            <CloseOutline fill={iconColor} aria-hidden width="1.125rem" height="1.125rem" />
          </button>
        </div>
        {withLife && (
          <animated.div
            className={sc('toast__animated-life', kind)}
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
