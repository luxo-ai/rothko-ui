import { animated, useTransition } from '@react-spring/web';
import React, { useEffect, useRef } from 'react';

import { isString, classes, scopedClasses as sc } from '@rothko-ui/utils';

import DomPortal from '../../library/Portal';
import ShadedBackdrop from '../../library/ShadedBackdrop/ShadedBackdrop';
import useId from '../../library/hooks/useId';
import {
  BODY_SCROLL_LOCK_IGNORE_ID,
  disableBodyScroll,
  enableBodyScroll,
} from '../../library/utils/domUtils';
import Typography from '../Typography/Typography';
import type { WithAria } from './types';
import styles from './Popup.module.scss';
import CloseButton from '../../library/Button/CloseButton';

const scopedClasses = sc(styles);

type PopupProps = WithAria<{
  id?: string;
  /**
   * The content of the popup.
   */
  children: React.ReactNode;
  /**
   * The CSS class name for the popup.
   */
  className?: string;
  /**
   * Callback function to be called when the popup is closed.
   */
  onClose: () => void;
  /**
   * Determines whether the popup is open or closed.
   */
  open: boolean;
  /**
   * The inline style for the popup.
   */
  style?: React.CSSProperties;
  /**
   * Determines whether the popup should blur the background.
   */
  blur?: boolean;
}>;

const BottomPopup: React.FC<PopupProps> = ({
  id,
  children,
  className,
  onClose,
  open: isOpen,
  style: styleProp = {},
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  blur,
}) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const contentId = useId();

  const baseClasses = scopedClasses('bottom-popup');

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
                aria-describedby={contentId}
                id={id}
                style={{ ...styleProp, ...style }}
                ref={popupRef}
                className={classes(baseClasses, className)}
              >
                <CloseButton
                  className={scopedClasses('bottom-popup__close-button')}
                  onClick={() => onClose()}
                />
                {isString(children) ? (
                  <Typography.body id={contentId}>{children}</Typography.body>
                ) : (
                  <div id={contentId}>{children}</div>
                )}
              </animated.div>
            )
        )}
      </ShadedBackdrop>
    </DomPortal>
  );
};

export default BottomPopup;
