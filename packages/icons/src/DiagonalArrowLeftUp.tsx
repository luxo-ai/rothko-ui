import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgDiagonalArrowLeftUp = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <path
        d="M17.71 16.29 9.42 8H15a1 1 0 0 0 0-2H7.05a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1H7a1 1 0 0 0 1-1V9.45l8.26 8.26a1 1 0 0 0 1.42 0 1 1 0 0 0 .03-1.42z"
        data-name="diagonal-arrow-left-up"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgDiagonalArrowLeftUp);
export default ForwardRef;
