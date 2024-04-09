import { useContext } from 'react';

import AccordionContext from './AccordionContext';

const useAccordion = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error('useAccordion called outside of context');
  }
  return ctx;
};

export default useAccordion;
