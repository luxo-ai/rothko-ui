import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';

const SvgMenuOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    role="img"
    ref={ref}
    {...props}
  >
    <rect x={3} y={11} width={18} height={2} rx={0.95} ry={0.95} />
    <rect x={3} y={16} width={18} height={2} rx={0.95} ry={0.95} />
    <rect x={3} y={6} width={18} height={2} rx={0.95} ry={0.95} />
  </svg>
);

const ForwardRef = forwardRef(SvgMenuOutline);
export default ForwardRef;
