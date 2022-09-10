import { disableBodyScroll, enableBodyScroll } from '../utils/domUtils';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Icon, ShadedBackdrop } from '../Library/Common';
import { PhantomButton } from '../Button/PhantomButton';
import { DomPortal } from '../Portal';

type ContainerProps = Pick<
  React.HTMLProps<HTMLDivElement>,
  'className' | 'style' | 'id' | 'aria-label'
>;

type PopupProps = ContainerProps & {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode
};

export const BottomPopup: React.FC<PopupProps> = ({
  onClose,
  isOpen,
  className,
  children,
  ...containerProps
}) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!popupRef.current || !popupRef.current.contains(e.target as any)) {
      onClose();
    }
  };

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
            if (runner.getAttribute('data-aemiko-body-scroll-lock-ignore') !== null) {
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
    <DomPortal wrapperId="bottom-popup-portal">
      <ShadedBackdrop onClick={onBackdropClick} className={clsx({ ['backdrop-open']: isOpen })}>
        <PopupContainer
          {...containerProps}
          ref={popupRef}
          className={clsx({ ['popup-open']: isOpen }, 'relative', className)}
        >
          <PhantomButton
            type="button"
            onClick={() => onClose()}
            style={{ top: 20, right: 32 }}
            className="absolute"
          >
            <Icon.close size="1.75rem" />
          </PhantomButton>
          {children}
        </PopupContainer>
      </ShadedBackdrop>
    </DomPortal>
  );
};

const PopupContainer = styled.div`
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  background-color: white;
  padding: 3.25rem 1.5rem 1.5rem 1.5rem;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
  height: 0;
  overflow: hidden;

  -webkit-transform: translateY(100%);
  -moz-transform: translateY(100%);
  -ms-transform: translateY(100%);
  transform: translateY(100%);

  -webkit-transition: transform 450ms ease-out;
  -moz-transition: transform 450ms ease-out;
  -ms-transition: transform 450ms ease-out;
  transition: transform 450ms ease-out;

  &.popup-open {
    height: auto;
    max-height: 100%;

    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);

    overflow: visible;
  }
`;
