import * as React from 'react';
import { SVGProps } from 'react';
const SvgCollapse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <g data-name="collapse">
      <path d="M19 9h-2.58l3.29-3.29a1 1 0 1 0-1.42-1.42L15 7.57V5a1 1 0 0 0-1-1 1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 0-2zM10 13H5a1 1 0 0 0 0 2h2.57l-3.28 3.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L9 16.42V19a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1z" />
    </g>
  </svg>
);
export default SvgCollapse;
