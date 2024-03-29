import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgMinusCircleOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <g data-name="minus-circle">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
        <path d="M15 11H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z" />
      </g>
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgMinusCircleOutline);
export default ForwardRef;
