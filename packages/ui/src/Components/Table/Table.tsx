import React from 'react';
import styled from 'styled-components';
import { textStyle } from '../Typography/Typography';
import TableBody from './TableBody';
import { TableContextProvider } from './TableContext';
import TableHeader from './TableHeader';
import TableHeaders from './TableHeaders';
import { isStringHeader } from './helpers';
import type { Header } from './types';

type TableProps = {
  headers?: Header[];
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
};

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ headers, children, style, className }, ref) => (
    <TableContextProvider headers={headers}>
      <StyledTable style={style} className={className} ref={ref}>
        {headers && (
          <TableHeaders>
            <tr>
              {headers.map(header => {
                if (isStringHeader(header)) {
                  return <TableHeader key={header}>{header}</TableHeader>;
                }
                const { key, content, className, ...rest } = header;
                return (
                  <TableHeader {...rest} className={className} key={key}>
                    {content}
                  </TableHeader>
                );
              })}
            </tr>
          </TableHeaders>
        )}
        <TableBody>{children}</TableBody>
      </StyledTable>
    </TableContextProvider>
  )
);

Table.displayName = 'Table';

const StyledTable = styled.table`
  width: 100%;
  font-variant-numeric: tabular-nums;
  border-collapse: collapse;
  background: var(--rothko-background, transparent);
  color: var(--rothko-color, #000);
  // width: 100%;

  & thead {
    background: var(--rothko-table-header-background, #ccc);
  }

  & tr:not(:last-of-type) {
    border-bottom-width: 0.1rem;
    border-bottom-style: solid;
    border-bottom-color: var(--rothko-table-row-border, #000);
  }

  & th {
    text-align: start;
    ${textStyle}
    font-family: var(--rothko-typography-body-bold);
    font-weight: bold;
    padding: 1rem 1.25rem;
  }

  & td {
    ${textStyle}
    font-family: var(--rothko-typography-body-light);
    padding: 1rem 1.25rem;
  }

  & td .tdBefore {
    display: none;
  }

  @media screen and (max-width: 40rem) {
    &,
    & thead,
    & tbody,
    & tr,
    & th,
    & td {
      display: block;
    }

    & thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    & td {
      padding: 0.3rem 0.125rem;
    }

    & tbody tr {
      padding: 0.25em;
    }

    & {
      border: 0.1rem solid var(--rothko-table-row-border, #000);
    }

    & td.pivoted {
      /* Behave like a "row" */
      border: none !important;
      position: relative;
      padding-left: calc(50% + 10px) !important;
      text-align: left !important;
      white-space: pre-wrap;
      overflow-wrap: break-word;
    }

    & td .tdBefore {
      /* Now like a table header */
      position: absolute;
      display: block;

      /* Top/left values mimic padding */
      left: 1rem;
      width: calc(50% - 20px);
      white-space: pre-wrap;
      overflow-wrap: break-word;
      text-align: left !important;
      font-weight: 600;
    }
  }
`;

export default Table;
