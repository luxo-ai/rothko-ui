import * as React from 'react';
import type { SVGProps } from 'react';
const SvgMenuOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <g data-name="menu">
      <rect x={3} y={11} width={18} height={2} rx={0.95} ry={0.95} />
      <rect x={3} y={16} width={18} height={2} rx={0.95} ry={0.95} />
      <rect x={3} y={6} width={18} height={2} rx={0.95} ry={0.95} />
    </g>
  </svg>
);
export default SvgMenuOutline;
