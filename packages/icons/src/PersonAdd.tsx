import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgPersonAdd = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <g data-name="person-add">
        <path d="M21 6h-1V5a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0V8h1a1 1 0 0 0 0-2zM10 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zM16 21a1 1 0 0 0 1-1 7 7 0 0 0-14 0 1 1 0 0 0 1 1" />
      </g>
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgPersonAdd);
export default ForwardRef;
