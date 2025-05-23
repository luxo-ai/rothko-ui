import * as React from 'react';
import { SVGProps } from 'react';
const SvgListOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <g data-name="list">
      <circle cx={4} cy={7} r={1} />
      <circle cx={4} cy={12} r={1} />
      <circle cx={4} cy={17} r={1} />
      <rect x={7} y={11} width={14} height={2} rx={0.94} ry={0.94} />
      <rect x={7} y={16} width={14} height={2} rx={0.94} ry={0.94} />
      <rect x={7} y={6} width={14} height={2} rx={0.94} ry={0.94} />
    </g>
  </svg>
);
export default SvgListOutline;
