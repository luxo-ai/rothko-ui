import * as React from 'react';
import { SVGProps } from 'react';
const SvgClipboard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <g data-name="clipboard">
      <path d="M18 4v3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3z" />
      <rect x={7} y={2} width={10} height={6} rx={1} ry={1} />
    </g>
  </svg>
);
export default SvgClipboard;
