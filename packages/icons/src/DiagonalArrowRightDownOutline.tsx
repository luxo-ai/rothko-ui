import * as React from 'react';
import type { SVGProps, Ref } from 'react';
import { forwardRef } from 'react';
const SvgDiagonalArrowRightDownOutline = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
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
        d="M17 8a1 1 0 0 0-1 1v5.59l-8.29-8.3a1 1 0 0 0-1.42 1.42l8.3 8.29H9a1 1 0 0 0 0 2h8a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"
        data-name="diagonal-arrow-right-down"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgDiagonalArrowRightDownOutline);
export default ForwardRef;
