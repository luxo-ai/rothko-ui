import { animated, useTransition } from '@react-spring/web';
import keyboardKey from 'keyboard-key';
import React, { useCallback, useEffect, useRef } from 'react';
import type { FlattenSimpleInterpolation } from 'styled-components';
import styled, { css } from 'styled-components';

import { CloseOutline } from '@rothko-ui/icons';
import { classes, isString } from '@rothko-ui/utils';

import ShadedBackdrop from '../../library/ShadedBackdrop';
import { phantomButtonStyle } from '../../library/PhantomButton';
import DomPortal from '../../library/Portal';
import type { RothkoSize } from '../../theme';
import {
  BODY_SCROLL_LOCK_IGNORE_ID,
  addEvent,
  disableBodyScroll,
  enableBodyScroll,
  removeEvent,
} from '../../library/utils/domUtils';
import Typography, { boldFontStyle } from '../Typography/Typography';
import { textChildrenStyle } from '../../library/Styles';
import type { WithAriaLabel, WithAriaLabelledBy } from '../../types';
import useId from '../../library/hooks/useId';
import { vuar } from '../../library/utils/vuar';

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
};

const headerStyleMap: Record<RothkoSize, FlattenSimpleInterpolation> = {
  xs: css`
    margin: 0 0 1.125rem 0;
    line-height: 1.25rem;
    font-size: 1rem;
    ${boldFontStyle};
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
};

type WithAria<T> = WithAriaLabelledBy<WithAriaLabel<T>>;

type ModalProps = WithAria<{
  id?: string;
  /**
   * The content of the modal.
   */
  children: React.ReactNode;
  /**
   * The CSS class name for the modal.
   */
  className?: string;
  /**
   * The callback function called when the modal is closed.
   */
  onClose?: () => void;
  /**
   * Whether the modal is open or closed.
   * @default false
   */
  open?: boolean;
  /**
   * The size of the modal.
   * @default 'm'
   */
  size?: RothkoSize;
  /**
   * The inline style for the modal.
   */
  style?: React.CSSProperties;
  /**
   * The title of the modal.
   */
  title?: string;
}>;

const Modal = ({
  id,
  children,
  className,
  open: isOpen = false,
  onClose,
  size = 'm',
  title,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  style: styleProp = {},
}: ModalProps) => {
  const titleId = useId();
  const modalContentId = useId();

  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModal = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current || !modalRef.current.contains(e.target as Node)) {
      closeModal();
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
        closeModal();
      }
    };
    addEvent(document.body, 'keydown', closeOnEsc);
    return () => removeEvent(document.body, 'keydown', closeOnEsc);
  }, [closeModal]);

  return (
    <DomPortal wrapperId={`modal-portal-${size}`}>
      <ModalBackdrop aria-hidden $show={isOpen} onClick={onBackdropClick}>
        {transition(
          (style, item) =>
            item && (
              <AnimatedModalContainer
                id={id}
                aria-label={ariaLabel}
                aria-labelledby={title && !ariaLabelledBy ? titleId : ariaLabelledBy}
                aria-describedby={modalContentId}
                aria-modal
                role="dialog"
                style={{ ...styleProp, ...style }}
                className={classes(`modal-size-${size}`, className)}
                ref={modalRef}
              >
                <ModalCloseButton aria-label="Close" onClick={() => closeModal()}>
                  <CloseOutline aria-hidden width="1.5rem" height="1.5rem" />
                </ModalCloseButton>
                {title && (
                  <ModalHeaderText id={titleId} className={`modal-header-size-${size}`}>
                    {title}
                  </ModalHeaderText>
                )}
                {isString(children) ? (
                  <Typography.body id={modalContentId}>{children}</Typography.body>
                ) : (
                  <div id={modalContentId}>children</div>
                )}
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
  background: ${vuar({ category: 'background', fallback: '#fff' })};
  margin: auto;
  overflow: scroll;
  scrollbar-width: thin;
  z-index: 2;
  user-select: text;

  will-change: transform, opacity;
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.2, 0.8, 0.4, 1);

  ${textChildrenStyle}

  & > svg {
    fill: ${vuar({ category: 'foreground', fallback: '#000' })};
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
  display: flex;
  padding: 0 1rem;
`;

const ModalCloseButton = styled.button.attrs({ type: 'button' })`
  ${phantomButtonStyle}
  position: absolute;
  top: 14px;
  right: 17px;
`;

export default Modal;
