import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgQuestionMarkOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <g data-name="Layer 2">
      <g data-name="question-mark">
        <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z" />
        <circle cx={12} cy={19} r={1} />
      </g>
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgQuestionMarkOutline);
export default ForwardRef;
