import React from 'react';

type SimpleInlineSpinnerProps = {
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
};

const clz = [
  'inline-block',
  'rounded-full',
  'indent-[-9999em]',
  'border-solid',
  'border-inherit border-l-transparent',
  'animate-spin',
  'w-[0.875rem]',
  'h-[0.875rem]',
  'border-[0.125rem]',
].join(' ');

export const InlineSpinner = ({ width, height, style = {} }: SimpleInlineSpinnerProps) => {
  return (
    <span
      aria-label="Loading"
      role="progressbar"
      className={clz}
      style={{ ...style, width, height }}
    >
      loading...
    </span>
  );
};
