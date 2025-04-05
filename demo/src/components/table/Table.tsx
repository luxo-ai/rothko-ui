import React from 'react';

import { isStringHeader } from './helpers';
import styles from './Table.module.scss';
import TableBody from './TableBody';
import TableContext from './TableContext';
import TableHeader from './TableHeader';
import TableHeaders from './TableHeaders';
import type { Header } from './types';

type TableProps = {
  headers?: Header[];
  children: React.ReactNode;
};

const Table = ({ headers = [], children }: TableProps) => (
  <TableContext.Provider value={{ headers }}>
    <table className={styles.table} role="table">
      {headers && (
        <TableHeaders>
          <tr>
            {headers.map(header => {
              if (isStringHeader(header)) {
                return <TableHeader key={header}>{header}</TableHeader>;
              }
              const { key, content, className, ...rest } = header;
              return (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <TableHeader {...rest} className={className} key={key}>
                  {content}
                </TableHeader>
              );
            })}
          </tr>
        </TableHeaders>
      )}
      <TableBody>{children}</TableBody>
    </table>
  </TableContext.Provider>
);

export default Table;
