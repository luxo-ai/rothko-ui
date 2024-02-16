import type { Set as ImSet } from 'immutable';
import { createContext, useContext } from 'react';
import type { RothkoKind } from '../../theme';
import type { IconOverride } from './types';

type IAccordionContext = {
  bordered?: boolean;
  iconOverride?: IconOverride;
  withIcons?: boolean;
  kind?: RothkoKind;
  onClickPanel: (id: string) => void;
  selectedPanels: ImSet<string>;
  spaced?: boolean;
};

export const AccordionContext = createContext<IAccordionContext | null>(null);

export const useAccordion = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error('useAccordion called outside of context');
  }
  return ctx;
};
