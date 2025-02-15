import { createContext } from 'react';

import type { Icon } from './types';
import type { RothkoKind } from '@rothko-ui/system';

type AccordionContextType = {
  /**
   * Determines whether the Accordion should have a border.
   */
  bordered?: boolean;
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
