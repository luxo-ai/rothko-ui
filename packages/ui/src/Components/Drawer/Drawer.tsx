import { animated, useTransition } from '@react-spring/web';
import { Close } from '@rothko-ui/icons';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { PhantomButton } from '../../Library/PhantomButton';
import { ShadedBackdrop } from '../../Library/Common';
import { DomPortal } from '../../Library/Portal';
import {
  BODY_SCROLL_LOCK_IGNORE_ID,
  disableBodyScroll,
  enableBodyScroll,
} from '../../utils/domUtils';
import { useDrawerContext } from './DrawerContext';

const TABLET_OR_MOBILE_MAX_WIDTH_PX = 750;
const DEFAULT_DRAWER_WIDTH_PX = 350;

type DrawerProps = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
};

const Drawer = ({ children, id, className, style: styleProp = {} }: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, closeDrawer } = useDrawerContext();

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
    <DomPortal wrapperId={`drawer-portal-${id || 'unknown'}`}>
      <DrawerBackdrop className={clsx({ ['backdrop-open']: isOpen })} onClick={onBackdropClick}>
        {transition(
          (style, item) =>
            item && (
              <AnimatedDrawerContainerDiv
                className={className}
                id={id}
                ref={drawerRef}
                style={{ ...styleProp, ...style }}
              >
                <PhantomButton style={{ marginBottom: '1rem' }} onClick={() => closeDrawer()}>
                  <Close width={24} height={24} />
                </PhantomButton>
                {children}
              </AnimatedDrawerContainerDiv>
            )
        )}
      </DrawerBackdrop>
    </DomPortal>
  );
};

const AnimatedDrawerContainerDiv = animated(styled.div`
  position: fixed;
  inset: 0 auto 0 0;
  background: var(--rothko-background, #fff);

  padding: 1.5rem 1.5rem;

  z-index: 999999;
  width: ${DEFAULT_DRAWER_WIDTH_PX}px;
  overflow-y: auto;

  @media only screen and (max-width: ${TABLET_OR_MOBILE_MAX_WIDTH_PX}px) {
    width: calc(100% - 2 * 1.5rem);
  }
`);

const DrawerBackdrop = styled(ShadedBackdrop)`
  -webkit-backface-visibility: hidden;
  z-index: 1;
  display: flex;
  padding: 0 1rem;
`;

export default Drawer;
