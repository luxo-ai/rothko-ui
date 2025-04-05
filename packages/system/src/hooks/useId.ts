import { useId as useIdReact } from 'react';
// import * as uuid from 'uuid';

// I tried using the React.useId() hook but
// that caused problems in the dropdown selectQuery

export const useId = (id?: string) => {
  const reactId = useIdReact();
  return id || reactId;
};
