import type { Nullable } from '@rothko-ui/utils';
import { parseInt } from '@rothko-ui/utils';

export const innerHeight = (el: HTMLElement) => {
  const height = el.clientHeight;
  const ownerWindow = el.ownerDocument.defaultView;
  if (!ownerWindow) {
    return 0;
  }
  const computedStyle = ownerWindow.getComputedStyle(el);
  const paddingTop = parseInt(computedStyle.paddingTop) || 0;
  const paddingBottom = parseInt(computedStyle.paddingBottom) || 0;
  return height - paddingTop - paddingBottom;
};

export const innerWidth = (el: HTMLElement) => {
  const width = el.clientWidth;
  const ownerWindow = el.ownerDocument.defaultView;
  if (!ownerWindow) {
    return 0;
  }
  const computedStyle = ownerWindow.getComputedStyle(el);
  const paddingLeft = parseInt(computedStyle.paddingLeft) || 0;
  const paddingRight = parseInt(computedStyle.paddingRight) || 0;
  return width - paddingLeft - paddingRight;
};

// exclude margin, since using offsetLeft etc
export const outerWidth = (el: HTMLElement) => {
  const width = el.clientWidth;
  const ownerWindow = el.ownerDocument.defaultView;
  if (!ownerWindow) {
    return 0;
  }
  const computedStyle = ownerWindow.getComputedStyle(el);
  const borderLeftWidth = parseInt(computedStyle.borderLeftWidth) || 0;
  const borderRightWidth = parseInt(computedStyle.borderRightWidth) || 0;
  return width + borderLeftWidth + borderRightWidth;
};

export const outerHeight = (el: HTMLElement) => {
  const height = el.clientHeight;
  const ownerWindow = el.ownerDocument.defaultView;
  if (!ownerWindow) {
    return 0;
  }
  const computedStyle = ownerWindow.getComputedStyle(el);
  const borderTopWidth = parseInt(computedStyle.borderTopWidth) || 0;
  const borderBottomWidth = parseInt(computedStyle.borderBottomWidth) || 0;
  return height + borderTopWidth + borderBottomWidth;
};

export const scrollBarWidth = () => {
  const ownerWindow = document.defaultView;
  if (!ownerWindow) {
    return 0;
  }
  // borders, margins, and
  const { documentElement } = document;
  const documentStyle = ownerWindow.getComputedStyle(documentElement);
  const borderLeftWidth = parseInt(documentStyle.borderLeftWidth) || 0;
  const borderRightWidth = parseInt(documentStyle.borderRightWidth) || 0;
  const marginLeft = parseInt(documentStyle.marginLeft) || 0;
  const marginRight = parseInt(documentStyle.marginRight) || 0;

  const windowWidth = ownerWindow.innerWidth;

  // clientWidth excludes borders, margins, and vertical scrollbars
  const documentClientWidth = documentElement.clientWidth;
  return (
    windowWidth -
    borderLeftWidth -
    borderRightWidth -
    marginLeft -
    marginRight -
    documentClientWidth
  );
};

export const getElementFullHeight = (el: Nullable<HTMLElement>) => {
  return el?.getBoundingClientRect().height || 0;
};

export const getElementFullWidth = (el: Nullable<HTMLElement>) => {
  return el?.getBoundingClientRect().width || 0;
};

export const getStyle = <K extends keyof CSSStyleDeclaration>(el: HTMLElement, key: K) => {
  const ownerWindow = el.ownerDocument.defaultView;
  return ownerWindow?.getComputedStyle(el)?.[key];
};
