import { css } from 'styled-components';

export const generateCssAnimation = (animationName: string, frames: string): string => {
  if (typeof window == 'undefined' || !window.document) {
    return animationName;
  }

  const styleEl = document.createElement('style');
  document.head.appendChild(styleEl);
  const styleSheet = styleEl.sheet;

  const keyFrames = css`
    @keyframes ${animationName} {
      ${frames}
    }
  `;

  if (styleSheet) {
    styleSheet.insertRule(keyFrames.toString(), 0);
  }

  return animationName;
};
