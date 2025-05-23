import * as React from 'react';
import { SVGProps } from 'react';
const SvgPeople = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <g data-name="people">
      <path d="M9 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zM17 13a3 3 0 1 0-3-3 3 3 0 0 0 3 3zM21 20a1 1 0 0 0 1-1 5 5 0 0 0-8.06-3.95A7 7 0 0 0 2 20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1" />
    </g>
  </svg>
);
export default SvgPeople;
