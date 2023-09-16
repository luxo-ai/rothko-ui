import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgRadioButtonOff = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
        d="M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10zm0-18a8 8 0 1 0 8 8 8 8 0 0 0-8-8z"
        data-name="radio-button-off"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgRadioButtonOff);
export default ForwardRef;
