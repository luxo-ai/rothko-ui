import { Table, TableData, TableRow } from '@rothko-ui/ui';
import React from 'react';

export type PropMeta = Readonly<{
  name: string;
  type: string;
  defaultValue: string | number | null;
  description: string;
}>;

type PropsTableProps = {
  propsMeta: readonly PropMeta[];
};

const PropsTable = ({ propsMeta }: PropsTableProps) => {
  return (
    <Table headers={['Name', 'Type', 'Default', 'Description']}>
      {propsMeta.map(({ name, type, defaultValue, description }) => (
        <TableRow key={name}>
          <TableData>{name}</TableData>
          <TableData>
            <code>{type}</code>
          </TableData>
          {defaultValue === null ? (
            <TableData />
          ) : (
            <TableData>
              <code>{defaultValue}</code>
            </TableData>
          )}
          <TableData>{description}</TableData>
        </TableRow>
      ))}
    </Table>
  );
};

export default PropsTable;
