import React, { useCallback, useState } from 'react';

import type { RothkoKind } from '../../theme/types';
import AccordionContext from './AccordionContext';
import type { Icon, WithAria } from './types';
import { classes, scopedClasses as sc } from '@rothko-ui/utils';
import styles from './Accordion.module.scss';

const scoppedClasses = sc(styles);

type AccordionProps = WithAria<{
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
   * If `true`, icons are _not_ shown next to items.
   */
  hideIcon?: boolean;
  /**
   * The list of selected panels by key.
   * @default []
   */
  selectedKeys?: string[];
  /**
   * Callback when a panel is opened or closed.
   */
  onPanelChange?: (isOpen: boolean, panelKey: string) => void;
}>;

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
  hideIcon,
}: AccordionProps) => {
  const baseClasses = scoppedClasses('accordion', compact && 'compact');
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

  return (
    <AccordionContext.Provider
      value={{
        bordered,
        iconOverride,
        kind,
        onClickPanel,
        selectedPanels,
        compact,
        hideIcon,
      }}
    >
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
