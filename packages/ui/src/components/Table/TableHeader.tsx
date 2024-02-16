import React from 'react';

type TableHeaderProps = {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

const TableHeader = ({ children, style, className }: TableHeaderProps) => {
  return (
    <th style={style} className={className}>
      {children}
    </th>
  );
};

export default TableHeader;
