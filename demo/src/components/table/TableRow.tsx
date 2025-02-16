import React from 'react';

import { isStringHeader } from './helpers';
import styles from './Table.module.scss';
import TableContext from './TableContext';
import TableData from './TableData';

type TableRowProps = {
  children: React.ReactElement[];
};

const TableRow = ({ children }: TableRowProps) => (
  <tr>
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
              <td
                // /* export classes from components */
                className={className ? `${styles['pivoted']} ${className}` : styles['pivoted']}
                style={style}
              >
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
