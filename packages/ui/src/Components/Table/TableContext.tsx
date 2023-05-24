import type { ReactNode } from 'react';
import React, { createContext, useContext } from 'react';
import type { Header } from './types';

type ITableContext = {
  headers: Header[];
};

const TableContext = createContext<ITableContext>({ headers: [] });

type TableContextProviderProps = {
  children?: ReactNode;
  headers?: Header[];
};

export const TableContextProvider = ({ headers = [], children }: TableContextProviderProps) => (
  <TableContext.Provider value={{ headers }}>{children}</TableContext.Provider>
);

export const useTableContext = () => useContext(TableContext);

export const TableContextConsumer = TableContext.Consumer;
