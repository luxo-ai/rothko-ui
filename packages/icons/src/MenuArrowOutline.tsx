import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgMenuArrowOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <g data-name="menu-arrow">
        <path d="M20.05 11H5.91l1.3-1.29a1 1 0 0 0-1.42-1.42l-3 3a1 1 0 0 0 0 1.42l3 3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L5.91 13h14.14a1 1 0 0 0 .95-.95V12a1 1 0 0 0-.95-1z" />
        <rect x={3} y={17} width={18} height={2} rx={0.95} ry={0.95} />
        <rect x={3} y={5} width={18} height={2} rx={0.95} ry={0.95} />
      </g>
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgMenuArrowOutline);
export default ForwardRef;
