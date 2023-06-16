import { animated, useTransition } from '@react-spring/web';
import { CloseOutline } from '@rothko-ui/icons';
import { classes, noop } from '@rothko-ui/utils';
import keyboardKey from 'keyboard-key';
import React, { useEffect, useRef } from 'react';
import type { FlattenSimpleInterpolation } from 'styled-components';
import styled, { css } from 'styled-components';
import { ShadedBackdrop } from '../../Library/Common';
import { phantomButtonStyle } from '../../Library/PhantomButton';
import { DomPortal } from '../../Library/Portal';
import type { RothkoSize } from '../../Theme';
import {
  BODY_SCROLL_LOCK_IGNORE_ID,
  addEvent,
  disableBodyScroll,
  enableBodyScroll,
  removeEvent,
} from '../../utils/domUtils';
import Typography from '../Typography/Typography';

const bodyStyleMap: Record<RothkoSize, FlattenSimpleInterpolation> = {
  xs: css`
    padding: 2.75rem 1.125rem 1.5rem 1.125rem;
    max-width: 20rem;
  `,
  s: css`
    padding: 2.75rem 1.25rem 1.75rem 1.25rem;
    max-width: 22rem;
  `,
  m: css`
    padding: 2.75rem 1.25rem 1.75rem 1.25rem;
    max-width: 32rem;
  `,
  l: css`
    padding: 2.875rem 1.5rem 1.875rem 1.5rem;
    max-width: 43rem;
  `,
  xl: css`
    padding: 3rem 1.75rem 2rem 1.75rem;
    max-width: 45rem;
  `,
};

const headerStyleMap: Record<RothkoSize, FlattenSimpleInterpolation> = {
  xs: css`
    margin: 0 0 1.125rem 0;
    line-height: 1.25rem;
    font-size: 1rem;
    font-family: var(--rothko-typography-body-bold);
    font-weight: bold;
  `,
  s: css`
    margin: 0 0 1.25rem 0;
    line-height: 1.8rem;
    font-size: 1.5rem;
  `,
  m: css`
    margin: 0 0 1.75rem 0;
    line-height: 1.875rem;
    font-size: 1.75rem;
  `,
  l: css`
    margin: 0 0 1.75rem 0;
    line-height: 1.875rem;
    font-size: 1.875rem;
  `,
  xl: css`
    margin: 0 0 1.875rem 0;
    line-height: 2rem;
    font-size: 2rem;
  `,
};

type ModalProps = {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  size?: RothkoSize;
  title?: string;
};

export const Modal = ({
  children,
  className,
  isOpen = false,
  onClose = noop,
  size = 'm',
  title,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current || !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const transition = useTransition(isOpen, {
    from: {
      opacity: 0.75,
      transform: 'translate3d(0,101%,0)',
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(0,0,0)',
    },
    leave: {
      immediate: true,
      opacity: 0.75,
      transform: 'translate3d(0,101%,0)',
    },
  });

  useEffect(() => {
    if (!modalRef.current) return;
    if (isOpen) {
      disableBodyScroll(modalRef.current, {
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
            if (!parentElement || parentElement.isEqualNode(modalRef.current)) {
              return false;
            }
            runner = parentElement;
          }
          return false;
        },
      });
    } else {
      enableBodyScroll(modalRef.current);
    }
  }, [isOpen, modalRef]);

  useEffect(() => {
    const closeOnEsc = (e: React.KeyboardEvent) => {
      const code = keyboardKey.getCode(e);
      if (!code) return;
      if (code === keyboardKey.Escape) {
        e.preventDefault();
        onClose();
      }
    };
    addEvent(document.body, 'keydown', closeOnEsc);
    return () => removeEvent(document.body, 'keydown', closeOnEsc);
  }, [onClose]);

  return (
    <DomPortal wrapperId={`modal-portal-${size}`}>
      <ModalBackdrop className={classes({ ['backdrop-open']: isOpen })} onClick={onBackdropClick}>
        {transition(
          (style, item) =>
            item && (
              <AnimatedModalContainer
                aria-label="modal"
                aria-modal="true"
                role="dialog"
                style={style}
                className={classes(`modal-size-${size}`, className)}
                ref={modalRef}
              >
                <ModalCloseButton onClick={() => onClose()}>
                  <CloseOutline width="1.5rem" height="1.5rem" />
                </ModalCloseButton>
                {title && (
                  <ModalHeaderText className={`modal-header-size-${size}`}>{title}</ModalHeaderText>
                )}
                {children}
              </AnimatedModalContainer>
            )
        )}
      </ModalBackdrop>
    </DomPortal>
  );
};

const ModalContainerDiv = styled.div`
  border-radius: 0.125rem; // 2px
  -webkit-backface-visibility: hidden;
  width: 100%;
  max-height: calc(100vh - 1rem);
  position: relative;
  background: var(--rothko-background, #fff);
  margin: auto;
  overflow: scroll;
  scrollbar-width: thin;
  z-index: 2;

  will-change: transform, opacity;
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.2, 0.8, 0.4, 1);

  & > h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  code {
    margin-top: 0;
    color: var(--rothko-color, #000);
  }

  & > svg {
    fill: var(--rothko-color, #000);
  }

  ${Object.entries(bodyStyleMap).map(
    ([key, value]) => css`
      &.modal-size-${key} {
        ${value}
      }
    `
  )};
`;

const AnimatedModalContainer = animated(ModalContainerDiv);

const ModalHeaderText = styled(Typography.body)`
  ${Object.entries(headerStyleMap).map(
    ([key, value]) => css`
      &.modal-header-size-${key} {
        ${value}
      }
    `
  )};
`;

const ModalBackdrop = styled(ShadedBackdrop)`
  -webkit-backface-visibility: hidden;
  z-index: 1;
  display: flex;
  padding: 0 1rem;
`;

const ModalCloseButton = styled.button.attrs({ type: 'button' })`
  ${phantomButtonStyle}
  position: absolute;
  top: 14px;
  right: 17px;
`;
