import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgPeople = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <g data-name="people">
        <path d="M9 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zM17 13a3 3 0 1 0-3-3 3 3 0 0 0 3 3zM21 20a1 1 0 0 0 1-1 5 5 0 0 0-8.06-3.95A7 7 0 0 0 2 20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1" />
      </g>
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgPeople);
export default ForwardRef;
