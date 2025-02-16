import { createContext } from 'react';

import type { Header } from './types';

const TableContext = createContext<{ headers: Header[] }>({ headers: [] });

export default TableContext;
