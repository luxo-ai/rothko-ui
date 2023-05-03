import type { Set as ImSet } from 'immutable';
import { createContext, useContext } from 'react';

type IAccordionContext = {
  onClickPanel: (id: string) => void;
  selectedPanels: ImSet<string>;
  borderColor?: string;
};

export const AccordionContext = createContext<IAccordionContext | null>(null);

export const useAccordion = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error('useAccordion called outside of context');
  }
  return ctx;
};
