import { useRef } from 'react';
import * as uuid from 'uuid';

// I tried using the React.useId() hook but
// that caused problems in the dropdown selectQuery

export const useId = (id?: string) => {
  const randomId = useRef(uuid.v4());
  return id || `id-${randomId.current}`;
};
