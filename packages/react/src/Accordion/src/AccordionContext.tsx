import type { RothkoKind } from '@rothko-ui/system';
import { createContext } from 'react';

import type { AccordionVariant, Icon } from './types';

type AccordionContextType = {
  /**
   * Variant of the accordion.
   */
  variant?: AccordionVariant;
  /**
   * Determines whether the Accordion should have a compact layout.
   */
  compact?: boolean;
  /**
   * Overrides the default icon for the Accordion.
   */
  iconOverride?: Icon;
  /**
   * Determines the kind of Accordion.
   */
  kind?: RothkoKind;
  /**
   * Callback function triggered when a panel is clicked.
   * @param id - The ID of the clicked panel.
   */
  onClickPanel: (id: string) => void;
  /**
   * IDs of the selected panels.
   */
  selectedPanels: string[];
};

const AccordionContext = createContext<AccordionContextType | null>(null);

export default AccordionContext;
