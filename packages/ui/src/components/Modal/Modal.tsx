import { animated, useTransition } from '@react-spring/web';
import keyboardKey from 'keyboard-key';
import React, { useCallback, useEffect, useRef } from 'react';

import { CloseOutline } from '@rothko-ui/icons';
import { classes, isString } from '@rothko-ui/utils';

import DomPortal from '../../library/Portal';
import ShadedBackdrop from '../../library/ShadedBackdrop/ShadedBackdrop';
import useId from '../../library/hooks/useId';
import {
  BODY_SCROLL_LOCK_IGNORE_ID,
  addEvent,
  disableBodyScroll,
  enableBodyScroll,
  removeEvent,
} from '../../library/utils/domUtils';
import type { RothkoSize } from '../../theme';
import type { WithAriaLabel, WithAriaLabelledBy } from '../../types';
import { Typography } from '../Typography';
import styles from './Modal.module.scss';

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
  blur?: boolean;
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
  blur,
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
      <ShadedBackdrop paddingH paddingV blur={blur} show={isOpen} onClick={onBackdropClick}>
        {transition(
          (style, item) =>
            item && (
              <animated.div
                id={id}
                aria-label={ariaLabel}
                aria-labelledby={title && !ariaLabelledBy ? titleId : ariaLabelledBy}
                aria-describedby={modalContentId}
                aria-modal
                role="dialog"
                style={{ ...styleProp, ...style }}
                className={classes(styles['modal-header'], styles[`modal-size-${size}`], className)}
                ref={modalRef}
              >
                <button
                  className={styles['modal-close-button']}
                  aria-label="Close"
                  onClick={() => closeModal()}
                >
                  <CloseOutline aria-hidden width="1.5rem" height="1.5rem" />
                </button>
                {title && (
                  <Typography.body
                    id={titleId}
                    className={classes(styles['modal-header'], styles[`modal-header-size-${size}`])}
                  >
                    {title}
                  </Typography.body>
                )}
                {isString(children) ? (
                  <Typography.body id={modalContentId}>{children}</Typography.body>
                ) : (
                  <div id={modalContentId}>{children}</div>
                )}
              </animated.div>
            )
        )}
      </ShadedBackdrop>
    </DomPortal>
  );
};

export default Modal;
