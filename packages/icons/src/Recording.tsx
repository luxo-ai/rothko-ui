import * as React from 'react';
import type { SVGProps, Ref } from 'react';
import { forwardRef } from 'react';
const SvgRecording = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <path
        d="M18 8a4 4 0 0 0-4 4 3.91 3.91 0 0 0 .56 2H9.44a3.91 3.91 0 0 0 .56-2 4 4 0 1 0-4 4h12a4 4 0 0 0 0-8z"
        data-name="recording"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgRecording);
export default ForwardRef;
