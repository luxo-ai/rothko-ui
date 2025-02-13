import { animated, useTransition } from '@react-spring/web';
import React, { useCallback, useEffect, useRef } from 'react';

import {
  BODY_SCROLL_LOCK_IGNORE_ID,
  addEvent,
  disableBodyScroll,
  enableBodyScroll,
  removeEvent,
  CloseButton,
  useId,
  ShadedBackdrop,
  DomPortal,
  classes,
  isString,
  getKeyCode,
  ListenableKeys,
} from '@rothko-ui/system';
import type { RothkoSize, WithAria } from '@rothko-ui/system';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';

type AriaAttributes = 'aria-label' | 'aria-labelledby' | 'aria-describedby';

type ModalProps = {
  /**
   * The `id` attribute of the modal.
   * @type {string}
   */
  id?: string;
  /**
   * The content of the modal.
   * @type {React.ReactNode}
   * @required
   */
  children: React.ReactNode;
  /**
   * CSS class name(s).
   * @type {string}
   */
  className?: string;
  /**
   * The callback function called when the modal is closed.
   */
  onClose?: () => void;
  /**
   * Whether the modal is open or closed.
   * @type {boolean}
   * @default false
   */
  open?: boolean;
  /**
   * The size of the modal.
   * @type {RothkoSize}
   * @default 'm'
   */
  size?: RothkoSize;
  /**
   * The inline style for the modal.
   * @type {React.CSSProperties}
   */
  style?: React.CSSProperties;
  /**
   * The title of the modal.
   * @type {string}
   */
  title?: string;
  /**
   * Whether the modal should blur the background.
   * @type {boolean}
   * @default false
   */
  blur?: boolean;
};

const modalPaddingSizeMap: Record<string, string> = {
  xs: 'pt-[2.75rem] pr-[1.125rem] pb-[1.5rem] pl-[1.125rem]',
  s: 'pt-[2.75rem] pr-[1.25rem] pb-[1.75rem] pl-[1.25rem]',
  m: 'pt-[2.75rem] pr-[1.25rem] pb-[1.75rem] pl-[1.25rem]',
  l: 'pt-[2.875rem] pr-[1.5rem] pb-[1.875rem] pl-[1.5rem]',
};

const modalMaxWidthSizeMap: Record<string, string> = {
  xs: 'max-w-[20rem]',
  s: 'max-w-[22rem]',
  m: 'max-w-[32rem]',
  l: 'max-w-[43rem]',
};

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
  'aria-describedby': ariaDescribedBy,
  blur,
  style: styleProp = {},
}: WithAria<ModalProps, AriaAttributes>) => {
  const titleId = useId();
  const contentId = useId();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const clz = classes(
    'w-full',
    'max-h-[calc(100vh-1rem)]',
    'rounded-[0.125rem]', // make token
    'bg-(--rothko-background)', // make own token?
    'm-auto',
    'overflow-scroll',
    'user-select-text',
    'text-(--rothko-typography-body-color)',
    'font-rothko-regular',
    'font-size-(--rothko-font-size-body)',
    'line-height-(--rothko-line-height-body)',
    modalPaddingSizeMap[size],
    modalMaxWidthSizeMap[size],
    className
  );

  // const baseClasses = sc('modal', `modal--${size}`);

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
      const code = getKeyCode(e);
      if (!code) return;
      if (code === ListenableKeys.Escape) {
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
                aria-describedby={ariaDescribedBy || (isString(children) ? contentId : undefined)}
                aria-modal
                role="dialog"
                style={{ ...styleProp, ...style }}
                className={clz}
                ref={modalRef}
              >
                <CloseButton
                  className="absolute top-[14px] right-[16px]"
                  onClick={() => closeModal()}
                />
                {title && (
                  <ModalHeader id={titleId} size={size}>
                    {title}
                  </ModalHeader>
                )}
                {isString(children) ? <ModalBody>{children}</ModalBody> : <>{children}</>}
              </animated.div>
            )
        )}
      </ShadedBackdrop>
    </DomPortal>
  );
};

export default Modal;
