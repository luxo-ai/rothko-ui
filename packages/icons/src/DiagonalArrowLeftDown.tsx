import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';

const SvgDiagonalArrowLeftDown = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    role="img"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <path
        d="M17.71 6.29a1 1 0 0 0-1.42 0L8 14.59V9a1 1 0 0 0-2 0v8a1 1 0 0 0 1 1h8a1 1 0 0 0 0-2H9.41l8.3-8.29a1 1 0 0 0 0-1.42z"
        data-name="diagonal-arrow-left-down"
      />
    </g>
  </svg>
);

const ForwardRef = forwardRef(SvgDiagonalArrowLeftDown);
export default ForwardRef;
