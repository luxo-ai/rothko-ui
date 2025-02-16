import { classes } from '@rothko-ui/system';
import type { WithAria } from '@rothko-ui/system';
import React, { useCallback, useMemo, useState } from 'react';

import AccordionContext from './AccordionContext';
import type { Icon } from './types';

type AriaAttributes =
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-hidden';

type AccordionProps = {
  /**
   * The `id` attribute of the accordion.
   * @type {string}
   */
  id?: string;
  /**
   * If `true`, borders are added around each accordion item.
   * @type {boolean}
   * @default false
   */
  bordered?: boolean;
  /**
   * The content of the accordion.
   * @type {React.ReactNode}
   * @required
   */
  children: React.ReactNode;
  /**
   * CSS class name(s).
   * @type {string}
   */
  className?: string;
  /**
   * If `true`, removes spacing between panels.
   * @type {boolean}
   * @default false
   */
  compact?: boolean;
  /**
   * Custom icon for accordion state indicators.
   * @type {Icon}
   */
  icon?: Icon;
  /**
   * If `true`, multiple panels can be expanded at once.
   * @type {boolean}
   * @default false
   */
  multiple?: boolean;
  /**
   * Inline style for the accordion.
   */
  style?: React.CSSProperties;
  /**
   * The list of selected panels by key.
   * @type {string[]}
   * @default []
   */
  selectedKeys?: string[];
  /**
   * Callback when a panel is opened or closed.
   * @type {(isOpen: boolean, panelKey: string) => void}
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
  multiple,
  onPanelChange,
  selectedKeys = [],
  style,
}: WithAria<AccordionProps, AriaAttributes>) => {
  const baseClasses = classes('flex flex-col', compact ? 'gap-0' : 'gap-3');
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
      onClickPanel,
      selectedPanels,
      compact,
    }),
    [bordered, iconOverride, onClickPanel, selectedPanels, compact]
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
