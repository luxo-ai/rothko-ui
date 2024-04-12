import { useId as useIdBase } from 'react';

const useId = (id?: string) => {
  const randomId = useIdBase();
  return id || randomId;
};

export default useId;
