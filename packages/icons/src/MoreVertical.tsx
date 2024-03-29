import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgMoreVertical = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <g data-name="more-vertical">
        <circle cx={12} cy={12} r={2} />
        <circle cx={12} cy={5} r={2} />
        <circle cx={12} cy={19} r={2} />
      </g>
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgMoreVertical);
export default ForwardRef;
