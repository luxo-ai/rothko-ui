import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgKeypad = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <g data-name="keypad">
        <path d="M5 2a3 3 0 1 0 3 3 3 3 0 0 0-3-3zM12 2a3 3 0 1 0 3 3 3 3 0 0 0-3-3zM19 8a3 3 0 1 0-3-3 3 3 0 0 0 3 3zM5 9a3 3 0 1 0 3 3 3 3 0 0 0-3-3zM12 9a3 3 0 1 0 3 3 3 3 0 0 0-3-3zM19 9a3 3 0 1 0 3 3 3 3 0 0 0-3-3zM5 16a3 3 0 1 0 3 3 3 3 0 0 0-3-3zM12 16a3 3 0 1 0 3 3 3 3 0 0 0-3-3zM19 16a3 3 0 1 0 3 3 3 3 0 0 0-3-3z" />
      </g>
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgKeypad);
export default ForwardRef;
