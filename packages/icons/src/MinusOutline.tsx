import * as React from 'react';
import { SVGProps } from 'react';
const SvgMinusOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <path d="M19 13H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2z" data-name="minus" />
  </svg>
);
export default SvgMinusOutline;
