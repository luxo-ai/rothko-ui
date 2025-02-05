import * as React from 'react';
import { SVGProps } from 'react';
const SvgMoreVerticalOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <g data-name="more-vertical">
      <circle cx={12} cy={12} r={2} />
      <circle cx={12} cy={5} r={2} />
      <circle cx={12} cy={19} r={2} />
    </g>
  </svg>
);
export default SvgMoreVerticalOutline;
