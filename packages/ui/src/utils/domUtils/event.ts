import { Nullable } from '@aemiko/utils';
import React from 'react';

const touchesKeys = ['touches', 'targetTouches', 'changedTouches'] as const;
type TouchKey = typeof touchesKeys[number];
export type WithTouches<V extends object, K extends TouchKey> = V & { [k in K]: React.TouchList };

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

export const hasTouches = <K extends TouchKey>(
  evt: React.UIEvent,
  ...keys: K[]
): evt is WithTouches<typeof evt, K> => {
  return keys.every(
    k => k in evt && typeof (evt as any)[k] === 'object' && 'identifiedTouch' in (evt as any)[k]
  );
};

export const addEvent = (
  node: Nullable<Node>,
  event: string,
  handler: (e: any) => void,
  inputOptions?: AddEventListenerOptions
) => {
  if (!node) return;
  if (node.addEventListener) {
    node.addEventListener(event, handler, { capture: true, ...inputOptions });
  }
  // old browser support
  else if ((node as any).attachEvent) {
    (node as any).attachEvent('on' + event, handler);
  }
  // backup for stupid old browsers
  else {
    (node as any)['on' + event] = handler;
  }
};

export const removeEvent = (
  node: Nullable<Node>,
  event: string,
  handler: (e: any) => void,
  inputOptions?: AddEventListenerOptions
) => {
  if (!node) return;
  if (node.removeEventListener) {
    node.removeEventListener(event, handler, { capture: true, ...inputOptions });
  }
  // old browser support
  else if ((node as any).detachEvent) {
    (node as any).detachEvent('on' + event, handler);
  }
  // backup for sillly old browsers
  else {
    (node as any)['on' + event] = null;
  }
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
