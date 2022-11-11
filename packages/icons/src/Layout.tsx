import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';

const SvgLayout = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      <g data-name="layout">
        <path d="M21 8V6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v2zM3 10v8a3 3 0 0 0 3 3h5V10zM13 10v11h5a3 3 0 0 0 3-3v-8z" />
      </g>
    </g>
  </svg>
);

const ForwardRef = forwardRef(SvgLayout);
export default ForwardRef;
