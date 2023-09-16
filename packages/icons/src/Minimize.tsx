import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgMinimize = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
        d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM13 12H9a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2z"
        data-name="minimize"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgMinimize);
export default ForwardRef;
