import * as React from 'react';
import type { SVGProps } from 'react';
const SvgEmail = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <path
      d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm0 2-6.5 4.47a1 1 0 0 1-1 0L5 6z"
      data-name="email"
    />
  </svg>
);
export default SvgEmail;
