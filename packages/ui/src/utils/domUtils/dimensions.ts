import { Nullable } from '@rothko-ui/utils';
import { parseDecimal } from '../utils';

export const innerHeight = (el: HTMLElement) => {
  const height = el.clientHeight;
  const ownerWindow = el.ownerDocument.defaultView;
  if (!ownerWindow) {
    return 0;
  }
  const computedStyle = ownerWindow.getComputedStyle(el);
  const paddingTop = parseDecimal(computedStyle.paddingTop) || 0;
  const paddingBottom = parseDecimal(computedStyle.paddingBottom) || 0;
  return height - paddingTop - paddingBottom;
};

export const innerWidth = (el: HTMLElement) => {
  const width = el.clientWidth;
  const ownerWindow = el.ownerDocument.defaultView;
  if (!ownerWindow) {
    return 0;
  }
  const computedStyle = ownerWindow.getComputedStyle(el);
  const paddingLeft = parseDecimal(computedStyle.paddingLeft) || 0;
  const paddingRight = parseDecimal(computedStyle.paddingRight) || 0;
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
  const borderLeftWidth = parseDecimal(computedStyle.borderLeftWidth) || 0;
  const borderRightWidth = parseDecimal(computedStyle.borderRightWidth) || 0;
  return width + borderLeftWidth + borderRightWidth;
};

export const outerHeight = (el: HTMLElement) => {
  const height = el.clientHeight;
  const ownerWindow = el.ownerDocument.defaultView;
  if (!ownerWindow) {
    return 0;
  }
  const computedStyle = ownerWindow.getComputedStyle(el);
  const borderTopWidth = parseDecimal(computedStyle.borderTopWidth) || 0;
  const borderBottomWidth = parseDecimal(computedStyle.borderBottomWidth) || 0;
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
  const borderLeftWidth = parseDecimal(documentStyle.borderLeftWidth) || 0;
  const borderRightWidth = parseDecimal(documentStyle.borderRightWidth) || 0;
  const marginLeft = parseDecimal(documentStyle.marginLeft) || 0;
  const marginRight = parseDecimal(documentStyle.marginRight) || 0;

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
