import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgMinusSquare = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
        d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm-3 10H9a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2z"
        data-name="minus-square"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgMinusSquare);
export default ForwardRef;
