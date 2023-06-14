import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgArrowIosBackOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
        d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
        data-name="arrow-ios-back"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgArrowIosBackOutline);
export default ForwardRef;
