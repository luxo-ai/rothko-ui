import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgPlusOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
        d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"
        data-name="plus"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgPlusOutline);
export default ForwardRef;
