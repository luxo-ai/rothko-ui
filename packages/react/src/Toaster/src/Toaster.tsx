import type { SpringValue } from '@react-spring/web';
import { animated } from '@react-spring/web';
import { CloseButton, isString, useId } from '@rothko-ui/system';
import type { WithAria, RothkoKind } from '@rothko-ui/system';
import React from 'react';

import { ToasterContent, ToasterLabel } from './ToasterText';
import type { ToastDetails } from './types';

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

const toastAnimatedBackdropClassnames = [
  'bg-(--rothko-background)',
  'rounded-[0.125rem]',
  'relative',
].join(' ');

const toastAnimatedClassnames = [
  'absolute',
  'bottom-0',
  'left-0',
  'w-auto',
  'h-[0.2rem]',
  'bg-[linear-gradient(130deg,_var(--toast-animated-background-from),_var(--toast-animated-background-to))]',
].join(' ');

const toastContentContainerClassnames = ['flex', 'flex-col', 'gap-[0.1rem]'].join(' ');

const toastClassnames = [
  'flex',
  'flex-wrap',
  'gap-[0.5rem]',
  'items-start',
  'justify-between',
  'py-[1rem]',
  'px-[0.75rem]',
  'bg-(--toast-background)',
  'rounded-[0.125rem]',
  // == text classes for children to inherit ==
  'rothko-font-regular',
  'rothko-paragraph-size-default',
  'text-(--toast-content-foreground)',
].join(' ');

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

    const toastAnimatedVarStyle = {
      '--toast-animated-background-from': kind
        ? `var(--rothko-${kind})`
        : 'var(--rothko-toast-life-filled-background)',
      '--toast-animated-background-to': kind
        ? `var(--rothko-${kind}-100)`
        : 'var(--rothko-toast-life-empty-background)',
    } as React.CSSProperties;

    const toastVarStyle = {
      '--toast-background': kind ? `var(--rothko-${kind})` : 'var(--rothko-toast-background)',
      '--toast-content-foreground': kind
        ? `var(--rothko-${kind}-foreground)`
        : 'var(--rothko-toast-foreground)',
    } as React.CSSProperties;

    return (
      <animated.div
        className={toastAnimatedBackdropClassnames}
        aria-hidden
        style={{ ...style, opacity: animatedStyle.opacity, height: animatedStyle.height }}
      >
        <div
          id={id}
          style={toastVarStyle}
          className={toastClassnames}
          role="alert"
          aria-live={kind === 'danger' ? 'assertive' : 'polite'}
          aria-atomic
          aria-label={ariaLabel}
          aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
          ref={ref}
        >
          <div className={toastContentContainerClassnames}>
            {label &&
              (isString(label) ? (
                <ToasterLabel id={labelId}>{label}</ToasterLabel>
              ) : (
                <div id={labelId}>{label}</div>
              ))}
            {content && typeof content === 'string' ? (
              <ToasterContent>{content}</ToasterContent>
            ) : (
              <div>{content}</div>
            )}
          </div>

          <CloseButton
            onClick={e => onClose?.(e)}
            size="1.125rem"
            className="mt-[0.125rem] block ml-auto"
            // fill = var(--rothko-rothko-toast-foreground)
          />
        </div>
        {withLife && (
          <animated.div
            className={toastAnimatedClassnames}
            style={{ right: life, ...toastAnimatedVarStyle }}
            aria-hidden
          />
        )}
      </animated.div>
    );
  }
);

Toast.displayName = 'Toast';

export default Toast;
