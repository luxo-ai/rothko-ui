import { CloseOutline } from '@aemiko/icons';
import clsx from 'clsx';
import keyboardKey from 'keyboard-key';
import React, { useEffect, useRef } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { phantomButtonStyle } from '../Button/PhantomButton';
import { ShadedBackdrop } from '../Library/Common';
import { DomPortal } from '../Portal';
import { BODY_FONT_FAMILY } from '../Text';
import { textStyle } from '../Text/Text';
import { AemikoSize } from '../Theme/types';
import { addEvent, disableBodyScroll, enableBodyScroll, removeEvent } from '../utils/domUtils';

const bodyStyleMap: Record<AemikoSize, FlattenSimpleInterpolation> = {
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
  xl: css`
    padding: 3rem 1.75rem 2rem 1.75rem;
    max-width: 45rem;
  `,
};

const headerStyleMap: Record<AemikoSize, FlattenSimpleInterpolation> = {
  xs: css`
    margin: 0 0 1.125rem 0;
    line-height: 1.25rem;
    font-size: 1rem;
    font-family: ${BODY_FONT_FAMILY.bold};
    font-weight: bold;
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
  xl: css`
    margin: 0 0 1.875rem 0;
    line-height: 2rem;
    font-size: 2rem;
  `,
};

type LimitedDivProps = Pick<React.HTMLProps<HTMLDivElement>, 'id' | 'style' | 'className'>;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: AemikoSize;
  title?: string;
} & LimitedDivProps;

export const Modal = ({
  isOpen,
  onClose,
  children,
  size = 'm',
  title,
  className,
  id,
  style,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current || !modalRef.current.contains(e.target as any)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen && modalRef.current) {
      disableBodyScroll(modalRef.current);
    } else if (modalRef.current) {
      enableBodyScroll(modalRef.current);
    }
  }, [isOpen, modalRef]);

  useEffect(() => {
    const closeOnEsc = (e: React.KeyboardEvent) => {
      const code = keyboardKey.getCode(e);
      if (!code) return;
      if (code === keyboardKey.Escape) {
        e.preventDefault();
        onClose();
      }
    };
    addEvent(document.body, 'keydown', closeOnEsc);
    return () => removeEvent(document.body, 'keydown', closeOnEsc);
  }, [onClose]);

  return (
    <DomPortal wrapperId={`modal-portal-${size}`}>
      <ModalBackdrop className={clsx({ ['backdrop-open']: isOpen })} onClick={onBackdropClick}>
        <ModalContainer
          id={id}
          style={style}
          className={clsx(`modal-size-${size}`, { ['modal-open']: isOpen }, className)}
          ref={modalRef}
        >
          <ModalCloseButton onClick={() => onClose()}>
            <CloseOutline width="1.5rem" height="1.5rem" />
          </ModalCloseButton>
          {title && (
            <ModalHeaderText className={`modal-header-size-${size}`}>{title}</ModalHeaderText>
          )}
          {children}
        </ModalContainer>
      </ModalBackdrop>
    </DomPortal>
  );
};

const ModalContainer = styled.div`
  border-radius: 0.125rem; // 2px
  -webkit-backface-visibility: hidden;
  width: 100%;
  max-height: calc(100vh - 1rem);
  position: relative;
  background: white;
  margin: auto;
  overflow: scroll;
  // display: none;
  scrollbar-width: thin;
  z-index: 2;

  // opacity: 0;
  transform: translate3d(0, 101%, 0);
  transition-property: transform; //, opacity;
  will-change: transform; //, opacity;

  &.modal-open {
    // display: block;
    transform: translate3d(0, 0, 0);
    //  opacity: 1;
    transition-timing-function: cubic-bezier(0.2, 0.8, 0.4, 1);
    transition-duration: 400ms;
    // pointer-events: all;
  }
  ${Object.entries(bodyStyleMap).map(
    ([key, value]) => css`
      &.modal-size-${key} {
        ${value}
      }
    `
  )};
`;

const ModalHeaderText = styled.p`
  ${textStyle}
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
  //transition-timing-function: cubic-bezier(0.2, 0.8, 0.4, 1);
  //transition-duration: 400ms;
  z-index: 1;
  display: flex;
  padding: 0 1rem;
`;

const ModalCloseButton = styled.button.attrs({ type: 'button' })`
  ${phantomButtonStyle}
  position: absolute;
  top: 14px;
  right: 17px;
`;
