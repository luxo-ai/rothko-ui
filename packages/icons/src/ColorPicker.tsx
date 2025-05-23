import * as React from 'react';
import { SVGProps } from 'react';
const SvgColorPicker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <path
      d="M19.4 7.34 16.66 4.6A1.92 1.92 0 0 0 14 4.53l-2 2-1.29-1.24a1 1 0 0 0-1.42 1.42L10.53 8 5 13.53a2 2 0 0 0-.57 1.21L4 18.91a1 1 0 0 0 .29.8A1 1 0 0 0 5 20h.09l4.17-.38a2 2 0 0 0 1.21-.57l5.58-5.58 1.24 1.24a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-1.24-1.24 2-2a1.92 1.92 0 0 0-.07-2.71zm-13 7.6L12 9.36l2.69 2.7-2.79 2.79"
      data-name="color-picker"
    />
  </svg>
);
export default SvgColorPicker;
