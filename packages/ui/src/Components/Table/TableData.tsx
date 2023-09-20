import React from 'react';

type TableDataProps = {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

const TableData = ({ children, style, className }: TableDataProps) => {
  return (
    <td style={style} className={className}>
      {children}
    </td>
  );
};

export default TableData;
