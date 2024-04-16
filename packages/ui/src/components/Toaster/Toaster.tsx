import type { SpringValue } from '@react-spring/web';
import { animated } from '@react-spring/web';
import React from 'react';
import styled from 'styled-components';

import { CloseOutline } from '@rothko-ui/icons';
import { isString } from '@rothko-ui/utils';

import { PhantomButton } from '../../library/PhantomButton';
import type { RothkoKind } from '../../theme';
import Typography from '../Typography/Typography';
import type { ToastDetails } from './types';
import type { WithAriaLabel, WithAriaLabelledBy } from '../../types';
import useId from '../../library/hooks/useId';
import { vuar } from '../../library/utils/vuar';

type WithAria<T> = WithAriaLabelledBy<WithAriaLabel<T>>;

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
  return (
    <AnimatedWhiteBackdrop
      aria-hidden
      style={{ ...style, opacity: animatedStyle.opacity, height: animatedStyle.height }}
    >
      <ToastAnimatedContainerDiv
        id={id}
        role="alert"
        aria-live={kind === 'danger' ? 'assertive' : 'polite'}
        aria-atomic
        aria-label={ariaLabel}
        aria-labelledby={!ariaLabelledBy && label ? labelId : ariaLabelledBy}
        ref={ref}
        kind={kind}
      >
        <ToastContentContainerDiv>
          {label &&
            (isString(label) ? (
              <Typography.body id={labelId} bold className="rothko-toast-text">
                {label}
              </Typography.body>
            ) : (
              <div id={labelId}>{label}</div>
            ))}
          {content && typeof content === 'string' ? (
            <Typography.body className="rothko-toast-text">{content}</Typography.body>
          ) : (
            <div>{content}</div>
          )}
        </ToastContentContainerDiv>
        <ToastCloseButton aria-label="Close" onClick={onClose}>
          <CloseOutline
            aria-hidden
            className="rothko-toast-icon"
            width="1.125rem"
            height="1.125rem"
          />
        </ToastCloseButton>
      </ToastAnimatedContainerDiv>
      {withLife && <AnimatedLife aria-hidden style={{ right: life }} kind={kind} />}
    </AnimatedWhiteBackdrop>
  );
});

Toast.displayName = 'Toast';

const ToastCloseButton = styled(PhantomButton)`
  margin-top: 0.125rem;
  display: block;
  margin-left: auto;
`;

const ToastAnimatedContainerDiv = styled.div<{
  kind?: RothkoKind;
}>`
  flex-wrap: wrap-reverse;
  display: flex;
  gap: 0.5rem;
  align-items: start;
  justify-content: space-between;
  padding: 1rem 0.75rem;
  background: ${({ kind }) =>
    vuar({
      kind,
      element: 'toast',
      category: 'background',
      fallback: '#fff',
    })};

  border-radius: 0.125rem;

  & > h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  code .rothko-toast-text {
    margin-top: 0;
    color: ${({ kind }) => {
      return vuar({ kind, element: 'toast', category: 'foreground', fallback: '#000' });
    }};
  }

  & > * .rothko-toast-icon {
    fill: ${({ kind }) => {
      return vuar({ kind, element: 'toast', category: 'foreground', fallback: '#000' });
    }};
  }
`;

const AnimatedWhiteBackdrop = styled(animated.div)`
  background: ${vuar({ category: 'background' })}
  border-radius: 0.125rem;
  box-shadow: 0 1px 4px rgb(28 28 28 / 10%), 0 4px 6px rgb(28 28 28 / 4%),
    0 8px 16px rgb(28 28 28 / 4%), 0 10px 20px 2px rgb(28 28 28 / 2%),
    0 12px 24px 4px rgb(28 28 28 / 4%);
  position: relative;
`;

const ToastContentContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const AnimatedLife = styled(animated.div)<{
  kind?: RothkoKind;
}>`
  position: absolute;
  bottom: 0;
  left: 0px;
  width: auto;
  background-image: linear-gradient(
    130deg,
    ${({ kind }) => {
      return vuar({
        kind,
        element: 'toast-life-filled',
        category: 'background',
        fallback: '#000',
      });
    }},
    ${({ kind }) => {
      return vuar({
        kind,
        scale: 100,
        element: 'toast-life-empty',
        category: 'background',
        fallback: '#fff',
      });
    }}
  );
  height: 0.2rem;
`;

export default Toast;
