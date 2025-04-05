import React from 'react';

type TableBodyProps = {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

const TableBody = ({ children, style, className }: TableBodyProps) => {
  return (
    <tbody style={style} className={className}>
      {children}
    </tbody>
  );
};

export default TableBody;
