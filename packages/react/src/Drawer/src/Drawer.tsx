import { animated, useTransition } from '@react-spring/web';
import {
  classes,
  isString,
  Backdrop,
  DomPortal,
  BODY_SCROLL_LOCK_IGNORE_ID,
  disableBodyScroll,
  enableBodyScroll,
  CloseButton,
} from '@rothko-ui/system';
import type { BackdropVariant, WithAria } from '@rothko-ui/system';
import React, { useEffect, useRef } from 'react';

import DrawerBody from './DrawerBody';
import DrawerContext from './DrawerContext';

type AriaAttributes = 'aria-label' | 'aria-labelledby' | 'aria-describedby';

type DrawerProps = {
  /**
   * The `id` attribute of the drawer.
   * @type {string}
   */
  id?: string;
  /**
   * The content to be rendered inside the drawer.
   * @type {React.ReactNode}
   */
  children?: React.ReactNode;
  /**
   * CSS class name(s).
   * @type {string}
   */
  className?: string;
  /**
   * Callback function called when the drawer is closed.
   */
  onClose?: () => void;
  /**
   * Determines whether the drawer is open or closed.
   * @type {boolean}
   * @default false
   */
  open?: boolean;
  /**
   * The inline style for the drawer.
   * @type {React.CSSProperties}
   */
  style?: React.CSSProperties;
  /**
   * Variant of the backdrop.
   * @type {BackdropVariant}
   */
  variant?: BackdropVariant;
};

const Drawer = ({
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  children,
  className,
  onClose,
  open: isOpen = false,
  style: styleProp = {},
  variant,
}: WithAria<DrawerProps, AriaAttributes>) => {
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const closeDrawer = () => {
    onClose?.();
  };

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!drawerRef.current || !drawerRef.current.contains(e.target as Node)) {
      closeDrawer();
    }
  };

  const transition = useTransition(isOpen, {
    from: {
      transform: 'translate3d(-101%,0,0)',
    },
    enter: {
      transform: 'translate3d(0,0,0)',
    },
    leave: {
      immediate: true,
      transform: 'translate3d(-101%,0,0)',
    },
  });

  useEffect(() => {
    if (!drawerRef.current) return;
    if (isOpen) {
      disableBodyScroll(drawerRef.current, {
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
            if (!parentElement || parentElement.isEqualNode(drawerRef.current)) {
              return false;
            }
            runner = parentElement;
          }
          return false;
        },
      });
    } else {
      enableBodyScroll(drawerRef.current);
    }
  }, [isOpen, drawerRef]);

  const clz = classes(
    'fixed',
    'inset-y-0 left-0', // inset: 0 auto 0 0;
    'z-9999', // z-index: 9999;
    'overflow-y-auto',
    'bg-(--rothko-background)',
    'p-6', // 1.5rem
    'w-[28rem]',
    'max-md:w-[calc(100%_-_3rem)]', // 1.5rem * 2 = 3rem from padding
    'max-sm:w-full',
    'select-text',
    // let children inherit text stuff
    'rothko-color-body',
    'rothko-font-regular',
    'rothko-paragraph-size-default',
    variant === 'none' && 'shadow-lg',
    className
  );

  return (
    <DrawerContext.Provider value={{ isOpen, closeDrawer }}>
      <DomPortal wrapperId="rothko-drawer-portal">
        <Backdrop variant={variant} show={isOpen} onClick={onBackdropClick}>
          {transition(
            (style, item) =>
              item && (
                <animated.div
                  aria-label={ariaLabel}
                  aria-labelledby={ariaLabelledBy}
                  aria-describedby={ariaDescribedBy}
                  role="dialog"
                  className={clz}
                  id={id}
                  ref={drawerRef}
                  style={{ ...styleProp, ...style }}
                >
                  <CloseButton
                    aria-label="Close"
                    style={{ marginBottom: '1rem' }}
                    onClick={() => closeDrawer()}
                  />
                  {isString(children) ? (
                    <DrawerBody>
                      <p>{children}</p>
                    </DrawerBody>
                  ) : (
                    <>{children}</>
                  )}
                </animated.div>
              )
          )}
        </Backdrop>
      </DomPortal>
    </DrawerContext.Provider>
  );
};

export default Drawer;
