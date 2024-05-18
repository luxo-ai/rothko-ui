import { classes } from '@rothko-ui/utils';
import React from 'react';
import TableContext from './TableContext';
import TableData from './TableData';
import { isStringHeader } from './helpers';
import styles from './Table.module.scss';

type TableRowProps = {
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactElement[];
};

const TableRow = ({ children, style, className }: TableRowProps) => (
  <tr style={style} className={className}>
    {React.Children.map(children, (child, idx) => {
      // Check if the child is a <td> tag
      // Check if the child is a TableData component
      const isTableDataTag = child && (child.type === TableData || child.type === 'td');
      if (!isTableDataTag) {
        throw new Error('Table.Row only accepts Table.Data as children');
      }
      // Extract the children of the <td> tag if it is one
      const innerContent = isTableDataTag ? child.props.children : child;
      const className = child?.props?.className;
      const style = child?.props?.style;

      return (
        <TableContext.Consumer>
          {({ headers }) => {
            const header = headers[idx];
            return (
              <td className={classes(styles['pivoted'], className)} style={style}>
                {header && (
                  <div className={styles['tdBefore']}>
                    {isStringHeader(header) ? header : header.content}
                  </div>
                )}
                {innerContent ? <div>{innerContent}</div> : <div>&nbsp;</div>}
              </td>
            );
          }}
        </TableContext.Consumer>
      );
    })}
  </tr>
);

export default TableRow;
