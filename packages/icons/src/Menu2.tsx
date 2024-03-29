import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgMenu2 = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <g data-name="menu-2">
        <circle cx={4} cy={12} r={1} />
        <rect x={7} y={11} width={14} height={2} rx={0.94} ry={0.94} />
        <rect x={3} y={16} width={18} height={2} rx={0.94} ry={0.94} />
        <rect x={3} y={6} width={18} height={2} rx={0.94} ry={0.94} />
      </g>
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgMenu2);
export default ForwardRef;
