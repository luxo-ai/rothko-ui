import * as React from 'react';
import { SVGProps } from 'react';
const SvgPowerOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <g data-name="power">
      <path d="M12 13a1 1 0 0 0 1-1V2a1 1 0 0 0-2 0v10a1 1 0 0 0 1 1z" />
      <path d="M16.59 3.11a1 1 0 0 0-.92 1.78 8 8 0 1 1-7.34 0 1 1 0 1 0-.92-1.78 10 10 0 1 0 9.18 0z" />
    </g>
  </svg>
);
export default SvgPowerOutline;
