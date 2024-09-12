import React, { useCallback, useMemo, useState } from 'react';

import type { RothkoKind } from '../../theme/types';
import AccordionContext from './AccordionContext';
import type { Icon } from './types';
import { classes, scopedClasses } from '@rothko-ui/utils';
import styles from './Accordion.module.scss';
import type { WithAria } from '../../types';

const sc = scopedClasses(styles);

type AriaAttributes =
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-hidden';

type AccordionProps = {
  id?: string;
  /**
   * If `true`, borders are added around each accordion item.
   */
  bordered?: boolean;
  /**
   * The content of the accordion, required.
   */
  children: React.ReactNode;
  /**
   * CSS class name for custom styling.
   */
  className?: string;
  /**
   * Adds spacing around items for better separation.
   */
  compact?: boolean;
  /**
   * Custom icons for accordion state indicators.
   */
  icon?: Icon;
  /**
   * Specifies the accordion's style kind.
   */
  kind?: RothkoKind;
  /**
   * If `true`, only one accordion item can be open at a time.
   */
  multiple?: boolean;
  /**
   * Inline styles for the accordion.
   */
  style?: React.CSSProperties;
  /**
   * The list of selected panels by key.
   * @default []
   */
  selectedKeys?: string[];
  /**
   * Callback when a panel is opened or closed.
   */
  onPanelChange?: (isOpen: boolean, panelKey: string) => void;
};

const Accordion = ({
  id,
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-hidden': ariaHidden,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  bordered,
  children,
  className,
  compact,
  icon: iconOverride,
  kind,
  multiple,
  onPanelChange,
  selectedKeys = [],
  style,
}: WithAria<AccordionProps, AriaAttributes>) => {
  const baseClasses = sc('accordion', compact && 'compact');
  const [selectedPanels, setSelectedPanels] = useState(selectedKeys || []);

  const onClickPanel = useCallback(
    (panelKey: string) => {
      setSelectedPanels(selected => {
        const isOpen = selected.includes(panelKey);
        onPanelChange?.(!isOpen, panelKey);

        if (isOpen) {
          return selected.filter(key => key !== panelKey);
        }

        return multiple ? [...selected, panelKey] : [panelKey];
      });
    },
    [setSelectedPanels, multiple, onPanelChange]
  );

  const value = useMemo(
    () => ({
      bordered,
      iconOverride,
      kind,
      onClickPanel,
      selectedPanels,
      compact,
    }),
    [bordered, iconOverride, kind, onClickPanel, selectedPanels, compact]
  );

  return (
    <AccordionContext.Provider value={value}>
      <div
        id={id}
        role="tablist"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-details={ariaDetails}
        aria-multiselectable={multiple}
        aria-hidden={ariaHidden}
        style={style}
        className={classes(baseClasses, className)}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export default Accordion;
