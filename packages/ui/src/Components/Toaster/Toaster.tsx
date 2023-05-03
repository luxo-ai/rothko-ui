import type { SpringValue } from '@react-spring/web';
import { animated } from '@react-spring/web';
import { CloseOutline } from '@rothko-ui/icons';
import React from 'react';
import styled, { css } from 'styled-components';
import { PhantomButton } from '../Button/PhantomButton';
import { idkFn } from '../../Theme/theme';
import type { KindProps, RothkoKind } from '../../Theme';
import Typography from '../Typography';
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
    kind = 'success',
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
              <Typography.h5>{label}</Typography.h5>
            ) : (
              <div>{label}</div>
            ))}
          {content && typeof content === 'string' ? (
            <Typography.body>{content}</Typography.body>
          ) : (
            <div>{content}</div>
          )}
        </ToastContentContainerDiv>
        <PhantomButton onClick={onClose} className="db">
          <CloseOutline width={20} height={20} />
        </PhantomButton>
        {withLife && <AnimatedLife style={{ right: life }} kind={kind} />}
      </ToastAnimatedContainerDiv>
    </AnimatedWhiteBackdrop>
  );
});

Toast.displayName = 'Toast';

const ToastAnimatedContainerDiv = styled.div<Required<KindProps>>`
  display: flex;
  gap: 0.125rem;
  align-items: start;
  justify-content: space-between;
  padding: 1.25rem;
  background: ${({ kind }) => idkFn(kind, 'bg-transparent')};
  border-radius: 0.125rem;
`;

const AnimatedWhiteBackdrop = styled(animated.div)`
  background: white;
  border-radius: 0.125rem;
  box-shadow: 0 1px 4px rgb(28 28 28 / 10%), 0 4px 6px rgb(28 28 28 / 4%),
    0 8px 16px rgb(28 28 28 / 4%), 0 10px 20px 2px rgb(28 28 28 / 2%),
    0 12px 24px 4px rgb(28 28 28 / 4%);
  position: relative;
`;

const ToastContentContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const AnimatedLife = styled(animated.div)<Required<KindProps>>`
  position: absolute;
  bottom: 0;
  left: 0px;
  width: auto;
  background-image: ${({ kind }) =>
    css`linear-gradient(130deg, ${idkFn(kind)}, ${idkFn(kind, 'bg-transparent')})`};
  height: 5px;
`;

export default Toast;
