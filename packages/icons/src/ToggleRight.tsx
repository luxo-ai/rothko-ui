import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgToggleRight = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <g data-name="toggle-right">
        <circle cx={15} cy={12} r={1} />
        <path d="M15 5H9a7 7 0 0 0 0 14h6a7 7 0 0 0 0-14zm0 10a3 3 0 1 1 3-3 3 3 0 0 1-3 3z" />
      </g>
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgToggleRight);
export default ForwardRef;
