import clsx from 'clsx';
import React from 'react';
import { TableContextConsumer } from '../TableContext';
import type { TableDataProps } from './types';
import { isStringHeader } from '../helpers';

type TableDataInnerProps = TableDataProps & {
  columnIndex: number;
};

const TableDataInner = ({ children, style, className, columnIndex }: TableDataInnerProps) => {
  return (
    <TableContextConsumer>
      {({ headers }) => {
        const header = headers[columnIndex];

        return (
          <td className={clsx(className, 'pivoted')} style={style}>
            {header && (
              <div className="tdBefore">{isStringHeader(header) ? header : header.content}</div>
            )}
            {children || <div>&nbsp;</div>}
          </td>
        );
      }}
    </TableContextConsumer>
  );
};

export default TableDataInner;
