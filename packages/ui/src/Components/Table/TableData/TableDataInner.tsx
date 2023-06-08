import { classes } from '@rothko-ui/utils';
import React from 'react';
import { TableContextConsumer } from '../TableContext';
import { isStringHeader } from '../helpers';
import type { TableDataProps } from './types';

type TableDataInnerProps = TableDataProps & {
  columnIndex: number;
};

const TableDataInner = ({ children, style, className, columnIndex }: TableDataInnerProps) => {
  return (
    <TableContextConsumer>
      {({ headers }) => {
        const header = headers[columnIndex];

        return (
          <td className={classes(className, 'pivoted')} style={style}>
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
