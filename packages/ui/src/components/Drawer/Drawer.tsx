import { animated, useTransition } from '@react-spring/web';
import React, { useEffect, useRef } from 'react';

import { Close } from '@rothko-ui/icons';
import { classes, isString } from '@rothko-ui/utils';

import ShadedBackdrop from '../../library/ShadedBackdrop/ShadedBackdrop';
import PhantomButton from '../../library/Button/PhantomButton';
import DomPortal from '../../library/Portal';
import {
  BODY_SCROLL_LOCK_IGNORE_ID,
  disableBodyScroll,
  enableBodyScroll,
} from '../../library/utils/domUtils';
import DrawerContext from './DrawerContext';
import useId from '../../library/hooks/useId';
import { Typography } from '../Typography';
import type { WithAria } from './types';
import styles from './Drawer.module.scss';

type DrawerProps = WithAria<{
  id?: string;
  /**
   * The content to be rendered inside the Drawer.
   */
  children?: React.ReactNode;
  /**
   * The CSS class name for the Drawer.
   */
  className?: string;
  /**
   * Callback function called when the Drawer is closed.
   */
  onClose?: () => void;
  /**
   * Determines whether the Drawer is open or closed.
   * @default false
   */
  open?: boolean;
  /**
   * The inline style for the Drawer.
   */
  style?: React.CSSProperties;
  /**
   * Determines whether the Drawer is blurred.
   * @default false
   */
  blur?: boolean;
}>;

const Drawer = ({
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  children,
  className,
  onClose,
  open: isOpen = false,
  style: styleProp = {},
  blur,
}: DrawerProps) => {
  const drawerContentId = useId();
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
                  aria-describedby={drawerContentId}
                  role="dialog"
                  className={classes(styles.drawer, className)}
                  id={id}
                  ref={drawerRef}
                  style={{ ...styleProp, ...style }}
                >
                  <PhantomButton
                    aria-label="Close"
                    style={{ marginBottom: '1rem' }}
                    onClick={() => closeDrawer()}
                  >
                    <Close aria-hidden width={28} height={28} />
                  </PhantomButton>
                  {isString(children) ? (
                    <Typography.body id={drawerContentId}>{children}</Typography.body>
                  ) : (
                    <div id={drawerContentId}>{children}</div>
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
