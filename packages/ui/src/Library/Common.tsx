import React from 'react';
import styled from 'styled-components';
import { HexColor, RGBColor } from '../Theme/types';
import { EmSize, RemSize } from '../types';

/* ATTN: ~~ DO NOT EXPORT IN index.tsx (for internal use only) ~~ */

export const ShadedBackdrop = styled.div`
  // shade the entire view in the background
  user-select: none;
  position: fixed;
  opacity: 0;
  &.backdrop-open {
    opacity: 1;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    inset: 0;
    z-index: 999;

    -webkit-transition: opacity 70ms linear;
    -moz-transition: opacity 70ms linear;
    -ms-transition: opacity 70ms linear;
    transition: opacity 70ms linear;
  }
`;

/* SVG Icons */
type SVGProps = Pick<
  React.HTMLProps<SVGElement>,
  'alt' | 'className' | 'style' | 'title' | 'tabIndex'
> & { size: RemSize | EmSize | number; fill?: HexColor | RGBColor };

const CloseSvg = ({ size, fill = '#000000', ...svgProps }: SVGProps) => (
  <svg
    {...svgProps}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    width={size}
    height={size}
  >
    <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
    <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
  </svg>
);

const SearchSvg = ({ size, fill = '#000000', ...svgProps }: SVGProps) => (
  <svg
    {...svgProps}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    width={size}
    height={size}
  >
    <rect width="24" height="24" opacity="0" />
    <path d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" />
  </svg>
);

const ChevronDownSvg = ({ size, fill = '#000000', ...svgProps }: SVGProps) => (
  <svg
    {...svgProps}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    width={size}
    height={size}
  >
    <path d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15 1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16z" />
  </svg>
);

const ChevronLeftSvg = ({ size, fill = '#000000', ...svgProps }: SVGProps) => (
  <svg
    {...svgProps}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    width={size}
    height={size}
  >
    <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0" />
    <path d="M13.36 17a1 1 0 0 1-.72-.31l-3.86-4a1 1 0 0 1 0-1.4l4-4a1 1 0 1 1 1.42 1.42L10.9 12l3.18 3.3a1 1 0 0 1 0 1.41 1 1 0 0 1-.72.29z" />
  </svg>
);

export const PlusSvg = ({ size, fill = '#000000', ...svgProps }: SVGProps) => (
  <svg
    {...svgProps}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    width={size}
    height={size}
  >
    <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
    <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" />
  </svg>
);

export const MinusSvg = ({ size, fill = '#000000', ...svgProps }: SVGProps) => (
  <svg
    {...svgProps}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    width={size}
    height={size}
  >
    <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
    <path d="M19 13H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2z" />
  </svg>
);

export const Icon = {
  close: CloseSvg,
  search: SearchSvg,
  chevronDown: ChevronDownSvg,
  chevronLeft: ChevronLeftSvg,
} as const;
