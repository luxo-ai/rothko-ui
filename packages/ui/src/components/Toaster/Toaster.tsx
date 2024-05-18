import type { SpringValue } from '@react-spring/web';
import { animated } from '@react-spring/web';
import React from 'react';

import { CloseOutline } from '@rothko-ui/icons';
import { isString, scopedClasses as sc } from '@rothko-ui/utils';

import type { RothkoKind } from '../../theme';
import Typography from '../Typography/Typography';
import type { ToastDetails, WithAria } from './types';
import useId from '../../library/hooks/useId';
import styles from './Toaster.module.scss';
import { vuar } from '../../library/utils/vuar';

const scopedClasses = sc(styles);

type AnimatedStyle = {
  height?: SpringValue<number>;
  life?: SpringValue<string>;
  opacity?: SpringValue<number>;
};

type ToastProps = Pick<ToastDetails, 'label' | 'content' | 'withLife'> &
  WithAria<{
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
  }>;

const Toast = React.forwardRef<HTMLDivElement, ToastProps>((props, ref) => {
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

  const iconColor = vuar({ kind, category: 'foreground' });

  return (
    <animated.div
      className={scopedClasses('toast__animated-backdrop')}
      aria-hidden
      style={{ ...style, opacity: animatedStyle.opacity, height: animatedStyle.height }}
    >
      <div
        id={id}
        className={scopedClasses('toast', kind)}
        role="alert"
        aria-live={kind === 'danger' ? 'assertive' : 'polite'}
        aria-atomic
        aria-label={ariaLabel}
        aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
        ref={ref}
      >
        <div className={scopedClasses('toast__content-container', kind)}>
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
          className={scopedClasses('toast__animated-life', kind)}
          aria-hidden
          style={{ right: life }}
        />
      )}
    </animated.div>
  );
});

Toast.displayName = 'Toast';

export default Toast;
