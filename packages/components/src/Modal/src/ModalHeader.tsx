import React from 'react';
import { classes, RothkoSize } from '@rothko-ui/system';

type ModalHeaderProps = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  size: RothkoSize;
};

const modalHeaderMarginSizeMap: Record<string, string> = {
  xs: 'mt-0 mr-0 mb-[1.125rem] ml-0',
  s: 'mt-0 mr-0 mb-[1.25rem] ml-0',
  m: 'mt-0 mr-0 mb-[1.75rem] ml-0',
  l: 'mt-0 mr-0 mb-[1.75rem] ml-0',
};

const modalHeaderLineHeightSizeMap: Record<string, string> = {
  xs: 'leading-[1.25rem]',
  s: 'leading-[1.8rem]',
  m: 'leading-[1.875rem]',
  l: 'leading-[1.875rem]',
};

const modalHeaderFontSizeSizeMap: Record<string, string> = {
  xs: 'text-[1rem]',
  s: 'text-[1.5rem]',
  m: 'text-[1.75rem]',
  l: 'text-[1.875rem]',
};

const ModalHeader = ({ id, className, style, size, children }: ModalHeaderProps) => {
  const clz = classes(
    size === 'xs' && 'font-rothko-bold font-weight-bold',
    modalHeaderFontSizeSizeMap[size],
    modalHeaderLineHeightSizeMap[size],
    modalHeaderMarginSizeMap[size],
    className
  );
  return (
    <p id={id} style={style} className={clz}>
      {children}
    </p>
  );
};

export default ModalHeader;
