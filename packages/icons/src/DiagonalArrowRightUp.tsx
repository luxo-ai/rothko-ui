import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgDiagonalArrowRightUp = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
        d="M18 7.05a1 1 0 0 0-1-1L9 6a1 1 0 0 0 0 2h5.56l-8.27 8.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L16 9.42V15a1 1 0 0 0 1 1 1 1 0 0 0 1-1z"
        data-name="diagonal-arrow-right-up"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgDiagonalArrowRightUp);
export default ForwardRef;
