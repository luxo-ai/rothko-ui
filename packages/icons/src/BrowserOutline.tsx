import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';
const SvgBrowserOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm1 15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7h14zM5 9V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3z" />
    <circle cx={8} cy={7.03} r={1} />
    <circle cx={12} cy={7.03} r={1} />
  </svg>
);
const ForwardRef = forwardRef(SvgBrowserOutline);
export default ForwardRef;
