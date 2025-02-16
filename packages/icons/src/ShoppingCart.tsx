import * as React from 'react';
import type { SVGProps } from 'react';
const SvgShoppingCart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <g data-name="shopping-cart">
      <path d="M21.08 7a2 2 0 0 0-1.7-1H6.58L6 3.74A1 1 0 0 0 5 3H3a1 1 0 0 0 0 2h1.24L7 15.26A1 1 0 0 0 8 16h9a1 1 0 0 0 .89-.55l3.28-6.56A2 2 0 0 0 21.08 7z" />
      <circle cx={7.5} cy={19.5} r={1.5} />
      <circle cx={17.5} cy={19.5} r={1.5} />
    </g>
  </svg>
);
export default SvgShoppingCart;
