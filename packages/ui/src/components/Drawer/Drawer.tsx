import { animated, useTransition } from '@react-spring/web';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Close } from '@rothko-ui/icons';

import ShadedBackdrop from '../../library/ShadedBackdrop';
import { PhantomButton } from '../../library/PhantomButton';
import DomPortal from '../../library/Portal';
import {
  BODY_SCROLL_LOCK_IGNORE_ID,
  disableBodyScroll,
  enableBodyScroll,
} from '../../library/utils/domUtils';
import DrawerContext from './DrawerContext';
import { textChildrenStyle } from '../../library/Styles';
import { bodySizeStyle, paragraphStyle } from '../Typography/Typography';
import type { WithAriaLabel, WithAriaLabelledBy } from '../../types';
import useId from '../../library/hooks/useId';
import { vuar } from '../../library/utils/vuar';

const TABLET_OR_MOBILE_MAX_WIDTH_PX = 750;
const DEFAULT_DRAWER_WIDTH_PX = 350;

type WithAria<T> = WithAriaLabelledBy<WithAriaLabel<T>>;

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
        <DrawerBackdrop aria-hidden $show={isOpen} onClick={onBackdropClick}>
          {transition(
            (style, item) =>
              item && (
                <AnimatedDrawerContainerDiv
                  aria-label={ariaLabel}
                  aria-labelledby={ariaLabelledBy}
                  aria-describedby={drawerContentId}
                  role="dialog"
                  className={className}
                  id={id}
                  ref={drawerRef}
                  style={{ ...styleProp, ...style }}
                >
                  <PhantomButton
                    type="button"
                    aria-label="Close"
                    style={{ marginBottom: '1rem' }}
                    onClick={() => closeDrawer()}
                  >
                    <Close aria-hidden width={28} height={28} />
                  </PhantomButton>
                  <DrawerContentContainerDiv id={drawerContentId}>
                    {children}
                  </DrawerContentContainerDiv>
                </AnimatedDrawerContainerDiv>
              )
          )}
        </DrawerBackdrop>
      </DomPortal>
    </DrawerContext.Provider>
  );
};

const AnimatedDrawerContainerDiv = animated(styled.div`
  position: fixed;
  inset: 0 auto 0 0;
  background: ${vuar({ category: 'background', fallback: '#fff' })};

  padding: 1.5rem 1.5rem;

  z-index: 999999;
  width: ${DEFAULT_DRAWER_WIDTH_PX}px;
  overflow-y: auto;

  @media only screen and (max-width: ${TABLET_OR_MOBILE_MAX_WIDTH_PX}px) {
    width: calc(100% - 2 * 1.5rem);
  }

  user-select: text;
`);

const DrawerContentContainerDiv = styled.div`
  ${textChildrenStyle}
  ${paragraphStyle}
  ${bodySizeStyle}
  margin: 0;
  padding: 0;
`;

const DrawerBackdrop = styled(ShadedBackdrop)`
  -webkit-backface-visibility: hidden;
  display: flex;
  padding: 0 1rem;
`;

export default Drawer;
