import * as React from 'react';
import { SVGProps } from 'react';
const SvgMusic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1rem"
    height="auto"
    {...props}
  >
    <path
      d="M19 15V4a1 1 0 0 0-.38-.78 1 1 0 0 0-.84-.2l-9 2A1 1 0 0 0 8 6v8.34a3.49 3.49 0 1 0 2 3.18 4.36 4.36 0 0 0 0-.52V6.8l7-1.55v7.09a3.49 3.49 0 1 0 2 3.17 4.57 4.57 0 0 0 0-.51z"
      data-name="music"
    />
  </svg>
);
export default SvgMusic;
