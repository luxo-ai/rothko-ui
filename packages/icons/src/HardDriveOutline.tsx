import * as React from 'react';
import { SVGProps } from 'react';
const SvgHardDriveOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <g data-name="hard-drive">
      <path d="m20.79 11.34-3.34-6.68A3 3 0 0 0 14.76 3H9.24a3 3 0 0 0-2.69 1.66l-3.34 6.68a2 2 0 0 0-.21.9V18a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5.76a2 2 0 0 0-.21-.9zM8.34 5.55a1 1 0 0 1 .9-.55h5.52a1 1 0 0 1 .9.55L18.38 11H5.62zM18 19H6a1 1 0 0 1-1-1v-5h14v5a1 1 0 0 1-1 1z" />
      <path d="M16 15h-4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2z" />
      <circle cx={8} cy={16} r={1} />
    </g>
  </svg>
);
export default SvgHardDriveOutline;
