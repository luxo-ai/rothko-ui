import * as React from 'react';
import { SVGProps } from 'react';
const SvgPerson = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <g data-name="person">
      <path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zM18 21a1 1 0 0 0 1-1 7 7 0 0 0-14 0 1 1 0 0 0 1 1z" />
    </g>
  </svg>
);
export default SvgPerson;
