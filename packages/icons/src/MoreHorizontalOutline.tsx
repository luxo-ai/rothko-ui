import * as React from 'react';
import { SVGProps } from 'react';
const SvgMoreHorizontalOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <g data-name="more-horizotnal">
      <circle cx={12} cy={12} r={2} />
      <circle cx={19} cy={12} r={2} />
      <circle cx={5} cy={12} r={2} />
    </g>
  </svg>
);
export default SvgMoreHorizontalOutline;
