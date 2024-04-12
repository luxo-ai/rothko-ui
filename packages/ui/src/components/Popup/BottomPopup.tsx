import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { animated, useTransition } from '@react-spring/web';

import { CloseOutline } from '@rothko-ui/icons';
import { classes } from '@rothko-ui/utils';

import { ShadedBackdrop } from '../../library/Common';
import { phantomButtonStyle } from '../../library/PhantomButton';
import { DomPortal } from '../../library/Portal';
import {
  BODY_SCROLL_LOCK_IGNORE_ID,
  disableBodyScroll,
  enableBodyScroll,
} from '../../library/utils/domUtils';
import { textChildrenStyle } from '../../library/Styles';
import { textStyle } from '../Typography/Typography';
import type { WithAriaLabel, WithAriaLabelledBy } from '../../types';
import useId from '../../library/hooks/useId';

type WithAria<T> = WithAriaLabelledBy<WithAriaLabel<T>>;

type PopupProps = WithAria<{
  /** The content to be displayed within the popup. */
  children: React.ReactNode;
  /** Optional CSS class name for custom styling. */
  className?: string;
  /** Optional ID attribute for the popup element. */
  id?: string;
  /** Callback function invoked when the popup is closed. */
  onClose: () => void;
  /** Boolean flag indicating whether the popup is open or closed. */
  open: boolean;
  style?: React.CSSProperties;
}>;

const BottomPopup: React.FC<PopupProps> = ({
  id: idProp,
  children,
  className,
  onClose,
  open: isOpen,
  style: styleProp = {},
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const id = useId(idProp);
  const contentId = `${id}-content`;

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <DomPortal wrapperId={`rothko-bottom-popup-${id || 'unknown'}`}>
      <ShadedBackdrop
        aria-hidden
        onClick={onBackdropClick}
        className={classes({ ['backdrop-open']: isOpen })}
      >
        {transition(
          (style, item) =>
            item && (
              <AnimatedPopupContainer
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-describedby={contentId}
                id={id}
                style={{ ...styleProp, style }}
                ref={popupRef}
                className={className}
              >
                <PopupCloseButton aria-label="Close" onClick={() => onClose()}>
                  <CloseOutline aria-hidden width="1.5rem" height="1.5rem" />
                </PopupCloseButton>
                <PopupContentContainerDiv id={contentId}>{children}</PopupContentContainerDiv>
              </AnimatedPopupContainer>
            )
        )}
      </ShadedBackdrop>
    </DomPortal>
  );
};

const PopupContainerDiv = styled.div`
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  background: var(--rothko-background, #fff);
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

const PopupContentContainerDiv = styled.div`
  ${textChildrenStyle}
  ${textStyle}
  margin: 0;
  padding: 0;
  user-select: text;
`;

const AnimatedPopupContainer = animated(PopupContainerDiv);

const PopupCloseButton = styled.button.attrs({ type: 'button' })`
  ${phantomButtonStyle}
  position: absolute;
  top: 14px;
  right: 16px;
`;

export default BottomPopup;
