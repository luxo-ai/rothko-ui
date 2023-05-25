import type { Set as ImSet } from 'immutable';
import { createContext, useContext } from 'react';
import type { RothkoKind } from '../../Theme';
import type { IconKind } from './types';

type IAccordionContext = {
  onClickPanel: (id: string) => void;
  selectedPanels: ImSet<string>;
  kind?: RothkoKind;
  bordered?: boolean;
  iconKind: IconKind;
};

export const AccordionContext = createContext<IAccordionContext | null>(null);

export const useAccordion = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error('useAccordion called outside of context');
  }
  return ctx;
};
