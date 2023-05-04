import { animated, useTransition } from '@react-spring/web';
import { CloseOutline } from '@rothko-ui/icons';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ShadedBackdrop } from '../../Library/Common';
import { phantomButtonStyle } from '../../Library/PhantomButton';
import { DomPortal } from '../../Library/Portal';
import {
  BODY_SCROLL_LOCK_IGNORE_ID,
  disableBodyScroll,
  enableBodyScroll,
} from '../../utils/domUtils';

type ContainerProps = Pick<React.HTMLProps<HTMLDivElement>, 'className' | 'id'>;

type PopupProps = ContainerProps & {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
};

const BottomPopup: React.FC<PopupProps> = ({ id, onClose, isOpen, className, children }) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!popupRef.current || !popupRef.current.contains(e.target as any)) {
      onClose();
    }
  };

  const transition = useTransition(isOpen, {
    from: {
      opacity: 0.75,
      height: 0,
      overflow: 'hidden',
      transform: 'translate3d(0,101%,0)',
    },
    enter: {
      opacity: 1,
      height: 'auto',
      overflow: 'visible',
      transform: 'translate3d(0,0,0)',
    },
    leave: {
      immediate: true,
      opacity: 0.75,
      height: 0,
      overflow: 'hidden',
      transform: 'translate3d(0,101%,0)',
    },
  });

  useEffect(() => {
    if (!popupRef.current) return;
    if (isOpen) {
      disableBodyScroll(popupRef.current, {
        allowTouchMove: el => {
          // Adaption of https://github.com/willmcpo/body-scroll-lock
          // except we prevent ascending the tree past the container ref
          // ISSUE w v^4.0.0-beta.0 https://github.com/willmcpo/body-scroll-lock/issues/182
          let runner = el;
          while (runner && runner !== document.body) {
            if (runner.getAttribute(BODY_SCROLL_LOCK_IGNORE_ID) !== null) {
              return true;
            }
            const { parentElement } = runner;
            if (!parentElement || parentElement.isEqualNode(popupRef.current)) {
              return false;
            }
            runner = parentElement;
          }
          return false;
        },
      });
    } else {
      enableBodyScroll(popupRef.current);
    }
  }, [isOpen, popupRef]);

  return (
    <DomPortal wrapperId="bottom-popup-portal">
      <ShadedBackdrop onClick={onBackdropClick} className={clsx({ ['backdrop-open']: isOpen })}>
        {transition(
          (style, item) =>
            item && (
              <div style={{ position: 'relative' }}>
                <AnimatedPopupContainer id={id} style={style} ref={popupRef} className={className}>
                  <PopupCloseButton onClick={() => onClose()}>
                    <CloseOutline width="1.75rem" height="1.75rem" />
                  </PopupCloseButton>
                  {children}
                </AnimatedPopupContainer>
              </div>
            )
        )}
      </ShadedBackdrop>
    </DomPortal>
  );
};

const PopupContainerDiv = styled.div`
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  background: var(--color-background, #fff);
  padding: 3.25rem 1.5rem 1.5rem 1.5rem;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
  height: 0;
  overflow: hidden;

  will-change: transform, opacity, height;
  transition-property: transform;
  transition-timing-function: ease-out;
`;

const AnimatedPopupContainer = animated(PopupContainerDiv);

const PopupCloseButton = styled.button.attrs({ type: 'button' })`
  ${phantomButtonStyle}
  position: absolute;
  top: 14px;
  right: 16px;
`;

export default BottomPopup;
