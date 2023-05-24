import React from 'react';
import type { TableDataProps } from './types';

const TableData = ({ children, style, className }: TableDataProps) => {
  return (
    <td style={style} className={className}>
      {children}
    </td>
  );
};

export default TableData;
