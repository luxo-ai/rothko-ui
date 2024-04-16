import React from 'react';
import styled from 'styled-components';
import {
  bodySizeStyle,
  boldFontStyle,
  lightFontStyle,
  paragraphStyle,
} from '../Typography/Typography';
import TableBody from './TableBody';
import TableContext from './TableContext';
import TableHeader from './TableHeader';
import TableHeaders from './TableHeaders';
import { isStringHeader } from './helpers';
import type { Header } from './types';
import { vuar } from '../../library/utils/vuar';

type TableProps = {
  headers?: Header[];
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
};

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ headers = [], children, style, className }, ref) => (
    <TableContext.Provider value={{ headers }}>
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
    </TableContext.Provider>
  )
);

Table.displayName = 'Table';

const StyledTable = styled.table`
  width: 100%;
  font-variant-numeric: tabular-nums;
  border-collapse: collapse;
  background: ${vuar({ element: 'table', category: 'background', fallback: 'transparent' })};

  color: ${vuar({ category: 'foreground' })};
  // width: 100%;

  & thead {
    background: ${vuar({ category: 'background', element: 'table-header' })};
  }

  & tr:not(:last-of-type) {
    border-bottom-width: 0.1rem;
    border-bottom-style: solid;
    border-bottom-color: ${vuar({ element: 'table-row', category: 'border', fallback: '#000' })};
  }

  & th {
    text-align: start;
    ${paragraphStyle}
    ${bodySizeStyle}
    ${boldFontStyle}
    padding: 1rem 1.25rem;
  }

  & td {
    ${paragraphStyle}
    ${bodySizeStyle}
    ${lightFontStyle}
    padding: 1.25rem;
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

    & tr:not(:last-of-type) {
      border-bottom-style: none;
    }

    & tr {
      background: ${vuar({
        element: 'table-row-minimized',
        category: 'background',
        fallback: 'transparent',
      })};

      margin-bottom: 0.3rem;
    }

    & td {
      padding: 0.75rem 0.5rem;
    }

    & tbody tr {
      padding: 0.25em;
    }

    & {
      background: unset;
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
