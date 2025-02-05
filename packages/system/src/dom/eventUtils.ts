/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Nilable, Obj } from '../utils/types';
import type React from 'react';

const touchesKeys = ['touches', 'targetTouches', 'changedTouches'] as const;
type TouchKey = (typeof touchesKeys)[number];
export type WithTouches<V extends Obj, K extends TouchKey> = V & { [k in K]: React.TouchList };

export const hasTouches = <K extends TouchKey>(evt: React.UIEvent, ...keys: K[]): evt is any => {
  return keys.every(
    k => k in evt && typeof (evt as any)[k] === 'object' && 'identifiedTouch' in (evt as any)[k]
  );
};

export const addEvent = (
  node: Nilable<Node>,
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
  node: Nilable<Node>,
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
