import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgNavigation2Outline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
        d="M13.67 22h-.06a1 1 0 0 1-.92-.8L11 13l-8.2-1.69a1 1 0 0 1-.12-1.93l16-5.33A1 1 0 0 1 20 5.32l-5.33 16a1 1 0 0 1-1 .68zm-6.8-11.9 5.19 1.06a1 1 0 0 1 .79.78l1.05 5.19 3.52-10.55z"
        data-name="navigation-2"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgNavigation2Outline);
export default ForwardRef;
