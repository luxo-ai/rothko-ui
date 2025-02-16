import { animated, useTransition } from '@react-spring/web';
import {
  isString,
  classes,
  DomPortal,
  ShadedBackdrop,
  useId,
  BODY_SCROLL_LOCK_IGNORE_ID,
  disableBodyScroll,
  enableBodyScroll,
  CloseButton,
} from '@rothko-ui/system';
import type { WithAria } from '@rothko-ui/system';
import React, { useEffect, useRef } from 'react';

import PopupBody from './PopupBody';

type AriaAttributes = 'aria-label' | 'aria-labelledby' | 'aria-describedby';

type PopupProps = {
  /**
   * The `id` attribute of the popup.
   * @type {string}
   */
  id?: string;
  /**
   * The content of the popup.
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
   * Callback function to be called when the popup is closed.
   */
  onClose: () => void;
  /**
   * Determines whether the popup is open or closed.
   * @type {boolean}
   * @default false
   * @required
   */
  open: boolean;
  /**
   * The inline style for the popup.
   * @type {React.CSSProperties}
   */
  style?: React.CSSProperties;
  /**
   * Determines whether the popup should blur the background.
   * @type {boolean}
   * @default false
   */
  blur?: boolean;
};

const Popup = ({
  id,
  children,
  className,
  onClose,
  open: isOpen,
  style: styleProp = {},
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  blur,
}: WithAria<PopupProps, AriaAttributes>) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const contentId = useId();

  const clz = classes(
    'fixed',
    'top-auto right-0 bottom-0 left-0', // inset: auto 0 0 0;
    'h-0', // create token
    'overflow-hidden',
    'rounded-t-lg', // make token - border-top-left-radius: 0.75rem; border-top-right-radius: 0.75rem;
    'bg-(--rothko-background)', // background: variables.$bottomPopupBackground;
    'pt-[3.25rem]', // padding-top: 3.25rem;
    'pr-[1.5rem]', // padding-right: 1.5rem;
    'pb-[1.5rem]', // padding-bottom: 1.5rem;
    'pl-[1.5rem]', // padding-left: 1.5rem;
    'will-change-[transform,opacity,height] transition-all ease-out',
    'select-text', // TODO - do we need this here and on drawer? yes so that we can select text in the popup since the backdrop is user select none
    // let children inherit text stuff
    'rothko-color-body',
    'rothko-font-regular',
    'rothko-paragraph-size-default',
    className
  );

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
    <DomPortal wrapperId="rothko-bottom-popup">
      <ShadedBackdrop blur={blur} onClick={onBackdropClick} show={isOpen}>
        {transition(
          (style, item) =>
            item && (
              <animated.div
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-describedby={ariaDescribedBy || (isString(children) ? contentId : undefined)}
                id={id}
                style={{ ...styleProp, ...style }}
                ref={popupRef}
                className={clz}
              >
                <CloseButton
                  className="absolute top-[14px] right-[16px]"
                  onClick={() => onClose()}
                />
                {isString(children) ? <PopupBody>{children}</PopupBody> : <>{children}</>}
              </animated.div>
            )
        )}
      </ShadedBackdrop>
    </DomPortal>
  );
};

export default Popup;
