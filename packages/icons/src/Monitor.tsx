import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgMonitor = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <g data-name="monitor">
        <path d="M19 3H5a3 3 0 0 0-3 3v5h20V6a3 3 0 0 0-3-3zM2 14a3 3 0 0 0 3 3h6v2H7a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2h-4v-2h6a3 3 0 0 0 3-3v-1H2z" />
      </g>
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgMonitor);
export default ForwardRef;
