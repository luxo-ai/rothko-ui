import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';

const SvgMinusCircle = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    role="img"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <path
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3 11H9a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2z"
        data-name="minus-circle"
      />
    </g>
  </svg>
);

const ForwardRef = forwardRef(SvgMinusCircle);
export default ForwardRef;
