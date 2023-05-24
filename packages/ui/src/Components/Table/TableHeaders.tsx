import React from 'react';

type TableHeadersProps = {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

const TableHeaders = ({ children, style, className }: TableHeadersProps) => {
  React.Children.forEach(children, child => {
    child;
  });
  return (
    <thead style={style} className={className}>
      {children}
    </thead>
  );
};

export default TableHeaders;
