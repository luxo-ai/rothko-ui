import * as React from 'react';
import { SVGProps } from 'react';
const SvgArrowCircleLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <path
      d="M22 12a10 10 0 1 0-10 10 10 10 0 0 0 10-10zm-11.86 3.69-2.86-3a.49.49 0 0 1-.1-.15.54.54 0 0 1-.1-.16.94.94 0 0 1 0-.76 1 1 0 0 1 .21-.33l3-3a1 1 0 0 1 1.42 1.42L10.41 11H16a1 1 0 0 1 0 2h-5.66l1.25 1.31a1 1 0 0 1-1.45 1.38z"
      data-name="arrow-circle-left"
    />
  </svg>
);
export default SvgArrowCircleLeft;
