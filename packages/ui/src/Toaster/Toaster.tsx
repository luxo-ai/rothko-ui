import { CloseOutline } from '@rothko-ui/icons';
import type { SpringValue } from '@react-spring/web';
import { animated } from '@react-spring/web';
import React from 'react';
import styled, { css } from 'styled-components';
import { PhantomButton } from '../Button/PhantomButton';
import { Text } from '../Text';
import type { CanColor } from '../Theme/ThemeContext';
import { useKindTheme } from '../Theme/ThemeContext';
import type { AemikoKind } from '../Theme/types';
import type { ToastDetails } from './types';

type AnimatedStyle = {
  opacity?: SpringValue<number>;
  height?: SpringValue<number>;
  life?: SpringValue<string>;
};

type ToastProps = Pick<ToastDetails, 'label' | 'content' | 'withLife'> & {
  kind?: AemikoKind;
  animatedStyle?: AnimatedStyle;
  style?: React.CSSProperties;
  onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      kind = 'success',
      label,
      content,
      withLife,
      onClose,
      style = {},
      animatedStyle: { life, ...animatedStyle } = {},
    },
    ref
  ) => {
    const [themeColorer] = useKindTheme(kind);
    return (
      <AnimatedWhiteBackdrop
        style={{ ...style, opacity: animatedStyle.opacity, height: animatedStyle.height }}
      >
        <ToastAnimatedContainerDiv ref={ref} themeColorer={themeColorer}>
          <ToastContentContainerDiv>
            {label && (typeof label === 'string' ? <Text.h3>{label}</Text.h3> : <div>{label}</div>)}
            {content && typeof content === 'string' ? (
              <Text.body>{content}</Text.body>
            ) : (
              <div>{content}</div>
            )}
          </ToastContentContainerDiv>
          <PhantomButton onClick={onClose} className="db">
            <CloseOutline width={20} height={20} />
          </PhantomButton>
          {withLife && <AnimatedLife themeColorer={themeColorer} style={{ right: life }} />}
        </ToastAnimatedContainerDiv>
      </AnimatedWhiteBackdrop>
    );
  }
);

Toast.displayName = 'Toast';

const ToastAnimatedContainerDiv = styled.div<CanColor>`
  display: flex;
  gap: 0.125rem;
  align-items: start;
  justify-content: space-between;
  padding: 1.25rem;
  background: ${({ themeColorer }) => themeColorer('bg:transparent')};
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

const AnimatedLife = styled(animated.div)<CanColor>`
  position: absolute;
  bottom: 0;
  left: 0px;
  width: auto;
  background-image: ${({ themeColorer }) =>
    css`linear-gradient(130deg, ${themeColorer()}, ${themeColorer('bg:transparent')})`};
  height: 5px;
`;
