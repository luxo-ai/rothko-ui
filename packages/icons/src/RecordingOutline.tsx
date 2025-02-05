import * as React from 'react';
import { SVGProps } from 'react';
const SvgRecordingOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <path
      d="M18 8a4 4 0 0 0-4 4 3.91 3.91 0 0 0 .56 2H9.44a3.91 3.91 0 0 0 .56-2 4 4 0 1 0-4 4h12a4 4 0 0 0 0-8zM4 12a2 2 0 1 1 2 2 2 2 0 0 1-2-2zm14 2a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"
      data-name="recording"
    />
  </svg>
);
export default SvgRecordingOutline;
