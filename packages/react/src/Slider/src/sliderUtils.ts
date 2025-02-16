import type { Nilable, Size } from '@rothko-ui/system';
import { parseInt, findBy } from '@rothko-ui/system';
import { innerHeight, innerWidth, outerHeight, outerWidth } from '@rothko-ui/system';
import type React from 'react';

export const getOffsetFactory = (args: { min: number; max: number }) => {
  return (v: number) => {
    const ratio = (v - args.min) / (args.max - args.min);
    return `${Math.max(0, ratio * 100)}%` as const;
  };
};

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
export const isMainClick = (e: React.MouseEvent) => {
  return e.button === 0;
};

export const isMouseEvent = (e: React.UIEvent): e is React.MouseEvent => {
  return [
    'click',
    'dblclick',
    'mousedown',
    'mouseup',
    'mouseover',
    'mouseout',
    'mousemove',
  ].includes(e.type);
};

export const getTouch = (evt: React.TouchEvent, identifier: number) => {
  return (
    // changedTouches = like touches, but is filtered to only the information for finger touches that started within the same node
    (evt.targetTouches && findBy(evt.targetTouches, t => identifier === t.identifier)) ||
    // a list information for every finger involed in the event
    (evt.changedTouches && findBy(evt.changedTouches, t => identifier === t.identifier)) ||
    // touches = list of information for every finger currently touching the screen
    (evt.touches && findBy(evt.touches, t => identifier === t.identifier))
  );
};

export const getTouchIdentifier = (evt: React.TouchEvent) => {
  if (evt.targetTouches && evt.targetTouches[0]) {
    return evt.targetTouches[0].identifier;
  }
  if (evt.changedTouches && evt.changedTouches[0]) {
    return evt.changedTouches[0].identifier;
  }
  if (evt.touches && evt.touches[0]) {
    return evt.touches[0].identifier;
  }
};

export type DragEvent = React.MouseEvent | React.TouchEvent;
export type DragDelta = Readonly<{ xDel: number; yDel: number }>;

type CalculatePosnArgs = {
  evt: DragEvent;
  forElement: HTMLElement;
  dragDelta?: DragDelta;
  touchIdentifier?: Nilable<number>;
};

export const calculateXYDragPosn = ({
  evt,
  forElement,
  dragDelta,
  touchIdentifier,
}: CalculatePosnArgs) => {
  // get the touch coordinates if was a touch event
  const touch =
    typeof touchIdentifier === 'number' && !isMouseEvent(evt)
      ? getTouch(evt, touchIdentifier)
      : null;

  // x,y posn within the _viewport_
  const eventX = isMouseEvent(evt) ? evt.clientX : touch?.clientX;
  const eventY = isMouseEvent(evt) ? evt.clientY : touch?.clientY;

  if (!eventX || !eventY) {
    throw new Error('Event is missing clientX + clientY');
  }

  // offsetParent is the first positioned parent (default to body)
  const offsetParent = forElement.offsetParent || forElement.ownerDocument.body;
  // get size + posn of parent relative to the viewport
  const offsetParentRect = offsetParent.getBoundingClientRect();

  // Remove the left (top) offset from the viewport posn to get the relative posn
  // additionally remove any drag deltas. E.g. the distance from mouse click to corner of the element in question
  const x = eventX + offsetParent.scrollLeft - offsetParentRect.left - (dragDelta?.xDel ?? 0);
  const y = eventY + offsetParent.scrollTop - offsetParentRect.top - (dragDelta?.yDel ?? 0);

  const boundingParent = forElement.parentElement;
  const ownerWindow = forElement.ownerDocument.defaultView;

  if (!boundingParent || !ownerWindow) {
    throw new Error('Could not find owner bounding parent');
  }

  // get the styles of both the element in question and it's parent
  const nodeStyle = ownerWindow.getComputedStyle(forElement);
  const boundNodeStyle = ownerWindow.getComputedStyle(boundingParent);

  // [read-only] offsetLeft (offsetTop) = position left (top) + margin from the **first positioned parent**.
  // ^ i.e. distance of the current element relative to the left (top) of the offsetParent node
  // remove left margin of element in question as well as any padding from the parent element.
  const left =
    -forElement.offsetLeft + parseInt(boundNodeStyle.paddingLeft) + parseInt(nodeStyle.marginLeft);
  const top =
    -forElement.offsetTop + parseInt(boundNodeStyle.paddingTop) + parseInt(nodeStyle.marginTop);

  // calculate the right (bottom) using the width of the parent
  const right =
    innerWidth(boundingParent) -
    outerWidth(forElement) -
    forElement.offsetLeft +
    parseInt(boundNodeStyle.paddingRight) -
    parseInt(nodeStyle.marginRight);

  const bottom =
    innerHeight(boundingParent) -
    outerHeight(forElement) -
    forElement.offsetTop +
    parseInt(boundNodeStyle.paddingBottom) -
    parseInt(nodeStyle.marginBottom);

  const boundedX = (v: number) => Math.max(left, Math.min(v, right));
  const boundedY = (v: number) => Math.max(top, Math.min(v, bottom));

  return {
    rawX: x,
    rawY: y,
    x: boundedX(x),
    y: boundedY(y),
    width: Math.abs(right - left),
    height: Math.abs(bottom - right),
  };
};

export const convertSizeToPixels = (rem: Size) => {
  return (
    parseInt(rem.slice(0, -3)) * parseFloat(getComputedStyle(document.documentElement).fontSize)
  );
};
