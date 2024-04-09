import { createContext } from 'react';
import type { Set as ImSet } from 'immutable';

import type { RothkoKind } from '../../theme';
import type { IconOverride } from './types';

type IAccordionContext = {
  /** If `true`, borders are added around each accordion item. Default is `false`. */
  bordered?: boolean;
  /** Adds spacing around items for better separation. Default is `true`. */
  compact?: boolean;
  /** If `true`, borders are added around each accordion item. Default is `false`. */
  iconOverride?: IconOverride;
  /** Specifies the accordion's style kind. */
  kind?: RothkoKind;
  /** Function to handle clicks on accordion panels, triggering open/close state changes. */
  onClickPanel: (id: string) => void;
  /** Function to handle clicks on accordion panels, triggering open/close state changes. */
  selectedPanels: ImSet<string>;
  /** Adds spacing around items for better separation. Default is `true`. */
  withIcon?: boolean;
};

const AccordionContext = createContext<IAccordionContext | null>(null);

export default AccordionContext;
