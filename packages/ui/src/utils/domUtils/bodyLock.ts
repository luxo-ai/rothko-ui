/**
 * Adaption of: https://github.com/willmcpo/body-scroll-lock
 * The decision to adapt was to get more control and fix mobie issues found in the original solution
 */
import { Nullable } from '@aemiko/utils';
import isNil from 'lodash/isNil';
import React from 'react';
import { parseDecimal } from '../utils';
import { getStyle, scrollBarWidth } from './dimensions';
import { addEvent, hasTouches, removeEvent, WithTouches } from './event';

type IOSPrevStyle = Readonly<{
  position: string;
  top: string;
  left: string;
  height: string;
  width: string;
  overflow: string;
  boxSizing: string;
}>;

type PrevStyle = Readonly<{
  overflow: string;
  paddingRight?: string;
}>;

type Opts = {
  reserveScrollBarGap?: boolean;
  allowTouchMove?: (el: Element) => boolean;
};

type Lock = {
  targetElement: HTMLElement;
  options: Opts;
};

const isIosDevice =
  typeof window !== 'undefined' &&
  window.navigator &&
  window.navigator.platform &&
  (/iP(ad|hone|od)/.test(window.navigator.platform) ||
    (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1));

let bodyLocks: Lock[] = [];
let iosPrevStyle: Nullable<IOSPrevStyle> = null;
let prevStyle: Nullable<PrevStyle> = null;
let documentListenerAdded = false;
let initialTouchClientY = -1;

const allowTouchMove = (el: Element) => {
  return bodyLocks.some(l => l.options.allowTouchMove && l.options.allowTouchMove(el));
};

const preventDefault = (evt: React.UIEvent<HTMLElement>) => {
  const touchMoveAllowed = allowTouchMove(evt.target as HTMLElement);
  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (!touchMoveAllowed && hasTouches(evt, 'touches') && evt.touches.length <= 1) {
    evt.preventDefault();
  }
};

/**
 * Set the overflow to hidden. Save previous settings in order to restore
 */
const setOverflowHidden = ({ reserveScrollBarGap }: Opts = {}) => {
  if (!isNil(prevStyle)) return;

  const scrollWidth = reserveScrollBarGap ? scrollBarWidth() : null;
  const existingOverflow = document.body.style.overflow;

  if (scrollWidth && scrollWidth > 0) {
    const rawPaddingRight = getStyle(document.body, 'paddingRight');
    const paddingRight = rawPaddingRight ? parseDecimal(rawPaddingRight) : 0;
    const existingPaddingRight = document.body.style.paddingRight;
    prevStyle = { overflow: existingOverflow, paddingRight: existingPaddingRight };
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${paddingRight + scrollWidth}px`;
  }
  // otherwise just set the overflow to hidden
  else {
    document.body.style.overflow = 'hidden';
    prevStyle = { overflow: existingOverflow };
  }
};

/**
 * Restore previous overflow settings if possible
 */
const restoreOverflowSetting = () => {
  const prevPaddingRight = prevStyle?.paddingRight;
  const prevOverflow = prevStyle?.overflow;

  if (!isNil(prevPaddingRight)) {
    document.body.style.paddingRight = prevPaddingRight;
  }
  if (!isNil(prevOverflow)) {
    document.body.style.overflow = prevOverflow;
  }
  // reset the prev style
  prevStyle = null;
};

// ~~~ FOR IOS (since "overflow: hidden" doesnt work on ios) ~~~

const setPositionFixed = () =>
  // Update the dom inside an animation frame
  window.requestAnimationFrame(() => {
    const { scrollY, innerHeight } = window;
    const { position, top, left, width, height, overflow, boxSizing } = document.body.style;

    if (isNil(iosPrevStyle)) {
      iosPrevStyle = { position, top, left, width, height, overflow, boxSizing };

      document.body.style.position = 'fixed';
      document.body.style.top = `${-scrollY}px`;
      document.body.style.left = '0px';
      document.body.style.height = `${Math.max(0, innerHeight - 1)}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.boxSizing = 'border-box';

      setTimeout(
        () =>
          window.requestAnimationFrame(() => {
            // if browser nav bar appeared
            const newInnerHeight = window.innerHeight;
            const bottomBarHeight = innerHeight - newInnerHeight;

            if (bottomBarHeight > 0 && scrollY >= innerHeight) {
              // prevent content from being hidden by nav bar
              document.body.style.top = `-${scrollY + bottomBarHeight}px`;
            }
          }),
        250
      );
    }
  });

const restorePositionSetting = () => {
  if (!isNil(iosPrevStyle)) {
    const y = -parseDecimal(document.body.style.top);
    const x = -parseDecimal(document.body.style.left);

    document.body.style.position = iosPrevStyle.position;
    document.body.style.top = iosPrevStyle.top;
    document.body.style.left = iosPrevStyle.left;
    document.body.style.width = iosPrevStyle.width;
    document.body.style.height = iosPrevStyle.height;
    document.body.style.overflow = iosPrevStyle.overflow;
    document.body.style.boxSizing = iosPrevStyle.boxSizing;

    window.scrollTo(x, y);
    iosPrevStyle = null;
  }
};

const isAtBottomOfScroll = (targetElement: HTMLElement) => {
  return targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight;
};

const isAtTopOfScroll = (targetElement: HTMLElement) => {
  return targetElement.scrollTop === 0;
};

const onTouchStart = (event: React.UIEvent<HTMLElement>) => {
  if (hasTouches(event, 'targetTouches') && event.targetTouches.length === 1) {
    initialTouchClientY = event.targetTouches[0].clientY;
  }
};

const onTouchMove = (event: React.UIEvent<HTMLElement>) => {
  if (hasTouches(event, 'targetTouches') && event.targetTouches.length === 1) {
    // currentTarget is element that this listener is attached to
    handleTouchScroll(event, event.currentTarget);
  }
};

const handleTouchScroll = (
  event: WithTouches<React.UIEvent<HTMLElement>, 'targetTouches'>,
  targetElement: HTMLElement
) => {
  // how much did we move since the initial touch
  const deltaY = (event.targetTouches[0]?.clientY || 0) - initialTouchClientY;
  // short-circuit if event target allowed to move
  if (allowTouchMove(event.target as any)) {
    return;
  }
  if (isAtTopOfScroll(targetElement) && deltaY > 0) {
    return preventDefault(event);
  }
  if (isAtBottomOfScroll(targetElement) && deltaY < 0) {
    return preventDefault(event);
  }
  // completely stop propogation
  event.stopPropagation();
};

export const disableBodyScroll = (el: HTMLElement, options?: Opts): void => {
  if (bodyLocks.some(lock => lock.targetElement === el)) return;

  const newLock = {
    targetElement: el,
    options: options || {},
  };

  bodyLocks = [...bodyLocks, newLock];

  if (isIosDevice) {
    setPositionFixed();
    addEvent(el, 'pointermove', preventDefault, { passive: false });
    addEvent(el, 'touchstart', onTouchStart, { passive: true });
    addEvent(el, 'touchmove', onTouchMove, { passive: false });
    if (!documentListenerAdded) {
      addEvent(document, 'touchmove', preventDefault, { passive: false });
      documentListenerAdded = true;
    }
  } else {
    setOverflowHidden(options);
  }
};

export const enableBodyScroll = (el: HTMLElement): void => {
  bodyLocks = bodyLocks.filter(lock => lock.targetElement !== el);
  if (isIosDevice) {
    removeEvent(el, 'pointermove', preventDefault);
    removeEvent(el, 'touchstart', onTouchStart);
    removeEvent(el, 'touchmove', onTouchMove);
  }
  if (documentListenerAdded && bodyLocks.length === 0) {
    removeEvent(document, 'touchmove', preventDefault, { passive: false });
    documentListenerAdded = false;
  }
  if (isIosDevice) {
    restorePositionSetting();
  } else {
    restoreOverflowSetting();
  }
};

export const clearAllBodyScrollLocks = () => {
  if (isIosDevice) {
    bodyLocks.forEach((lock: Lock) => {
      removeEvent(lock.targetElement, 'pointermove', preventDefault);
      removeEvent(lock.targetElement, 'touchstart', onTouchStart);
      removeEvent(lock.targetElement, 'touchmove', onTouchMove);
    });
  }
  if (documentListenerAdded) {
    removeEvent(document, 'touchmove', preventDefault, { passive: false });
    documentListenerAdded = false;
  }
  if (isIosDevice) {
    restorePositionSetting();
  } else {
    restoreOverflowSetting();
  }
  initialTouchClientY = -1;
  bodyLocks = [];
};
