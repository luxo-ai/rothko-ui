import { animated, useTransition } from '@react-spring/web';
import React, { useEffect, useRef } from 'react';

import {
  classes,
  isString,
  ShadedBackdrop,
  DomPortal,
  BODY_SCROLL_LOCK_IGNORE_ID,
  disableBodyScroll,
  enableBodyScroll,
  CloseButton,
} from '@rothko-ui/system';

import DrawerContext from './DrawerContext';
import type { WithAria } from '@rothko-ui/system';
import DrawerBody from './DrawerBody';

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
   * Determines whether the drawer is blurred.
   * @type {boolean}
   * @default false
   */
  blur?: boolean;
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
  blur,
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
    'w-[25rem]', // create token
    'z-9999', // z-index: 9999;
    'overflow-y-auto',
    'bg-(--rothko-background)',
    'p-6', // 1.5rem
    'sm:w-[calc(100% - 2 * 1.5rem)]', // from padding,
    'user-select-text',
    // let children inherit text stuff
    'text-(--rothko-typography-body-color)',
    'font-rothko-regular',
    'font-size-(--rothko-font-size-body)',
    'line-height-(--rothko-line-height-body)',
    className
  );

  return (
    <DrawerContext.Provider value={{ isOpen, closeDrawer }}>
      <DomPortal wrapperId="rothko-drawer-portal">
        <ShadedBackdrop paddingH blur={blur} show={isOpen} onClick={onBackdropClick}>
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
        </ShadedBackdrop>
      </DomPortal>
    </DrawerContext.Provider>
  );
};

export default Drawer;
