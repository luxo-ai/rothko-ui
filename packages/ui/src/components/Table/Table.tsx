'use client';

import React from 'react';

import { classes } from '@rothko-ui/utils';

import TableBody from './TableBody';
import TableContext from './TableContext';
import TableHeader from './TableHeader';
import TableHeaders from './TableHeaders';
import { isStringHeader } from './helpers';
import type { Header } from './types';
import styles from './Table.module.scss';

type TableProps = {
  headers?: Header[];
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
};

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ headers = [], children, style, className }, ref) => (
    <TableContext.Provider value={{ headers }}>
      <table style={style} className={classes(styles['table'], className)} ref={ref}>
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
  )
);

Table.displayName = 'Table';

export default Table;
