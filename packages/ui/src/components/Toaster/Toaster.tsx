import type { SpringValue } from '@react-spring/web';
import { animated } from '@react-spring/web';
import { CloseOutline } from '@rothko-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { PhantomButton } from '../../Libraryy/PhantomButton';
import type { KindProps, RothkoKind } from '../../Theme';
import Typography from '../Typography/Typography';
import type { ToastDetails } from './types';

type AnimatedStyle = {
  height?: SpringValue<number>;
  life?: SpringValue<string>;
  opacity?: SpringValue<number>;
};

type ToastProps = Pick<ToastDetails, 'label' | 'content' | 'withLife'> & {
  animatedStyle?: AnimatedStyle;
  kind?: RothkoKind;
  onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: React.CSSProperties;
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>((props, ref) => {
  const {
    animatedStyle: { life, ...animatedStyle } = {},
    content,
    kind,
    label,
    onClose,
    style = {},
    withLife,
  } = props;
  return (
    <AnimatedWhiteBackdrop
      style={{ ...style, opacity: animatedStyle.opacity, height: animatedStyle.height }}
    >
      <ToastAnimatedContainerDiv ref={ref} kind={kind}>
        <ToastContentContainerDiv>
          {label &&
            (typeof label === 'string' ? (
              <Typography.body bold className="rothko-toast-text">
                {label}
              </Typography.body>
            ) : (
              <div>{label}</div>
            ))}
          {content && typeof content === 'string' ? (
            <Typography.body className="rothko-toast-text">{content}</Typography.body>
          ) : (
            <div>{content}</div>
          )}
        </ToastContentContainerDiv>
        <ToastCloseButton onClick={onClose}>
          <CloseOutline className="rothko-toast-icon" width="1.125rem" height="1.125rem" />
        </ToastCloseButton>
      </ToastAnimatedContainerDiv>
      {withLife && <AnimatedLife style={{ right: life }} kind={kind} />}
    </AnimatedWhiteBackdrop>
  );
});

Toast.displayName = 'Toast';

const ToastCloseButton = styled(PhantomButton)`
  margin-top: 0.125rem;
  display: block;
  margin-left: auto;
`;

const ToastAnimatedContainerDiv = styled.div<KindProps>`
  flex-wrap: wrap-reverse;
  display: flex;
  gap: 0.5rem;
  align-items: start;
  justify-content: space-between;
  padding: 1rem 0.75rem;
  background: ${({ kind }) =>
    kind ? `var(--rothko-${kind}-500, #fff)` : 'var(--rothko-toast-background, #fff)'};
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
    color: ${({ kind }) =>
      kind ? `var(--rothko-${kind}-color, #000)` : 'var(--rothko-toast-color, #000)'};
  }

  & > * .rothko-toast-icon {
    fill: ${({ kind }) =>
      kind ? `var(--rothko-${kind}-color, #000)` : 'var(--rothko-toast-color, #000)'};
  }
`;

const AnimatedWhiteBackdrop = styled(animated.div)`
  background: var(--rothko-background, #fff);
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

const AnimatedLife = styled(animated.div)<KindProps>`
  position: absolute;
  bottom: 0;
  left: 0px;
  width: auto;
  background-image: linear-gradient(
    130deg,
    ${({ kind }) =>
      kind ? `var(--rothko-${kind}-100, #000)` : 'var(--rothko-toast-life-filled, #000)'},
    ${({ kind }) =>
      kind ? `var(--rothko-${kind}-transparent-100, #000)` : 'var(--rothko-toast-life-empty, #fff)'}
  );
  height: 0.2rem;
`;

export default Toast;
