import type { Header, StringHeader } from './types';

export const isStringHeader = (header: Header): header is StringHeader => {
  return typeof header === 'string';
};
