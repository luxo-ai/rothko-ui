import React from 'react';
import TableDataInner from './TableData/TableDataInner';

type TableRowProps = {
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactElement[];
};

const TableRow = ({ children, style, className }: TableRowProps) => (
  <tr style={style} className={className}>
    {React.Children.map(children, (child, idx) => {
      return <TableDataInner {...child.props} columnIndex={idx} key={idx} />;
    })}
  </tr>
);

export default TableRow;
