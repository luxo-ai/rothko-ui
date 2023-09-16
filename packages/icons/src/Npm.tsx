import * as React from 'react';
import type { SVGProps, Ref } from 'react';
import { forwardRef } from 'react';
const SvgNpm = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
        d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h7V11h4v10h1a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z"
        data-name="npm"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgNpm);
export default ForwardRef;
