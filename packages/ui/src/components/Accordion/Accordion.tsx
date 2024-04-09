import React, { useCallback, useState } from 'react';
import { Set as ImSet } from 'immutable';
import styled, { css } from 'styled-components';

import type { RothkoKind } from '../../theme/types';
import AccordionContext from './AccordionContext';
import type { IconOverride } from './types';

type AccordionProps = {
  /** ARIA label for the accordion, providing additional context for accessibility. */
  'aria-describedby'?: string;
  'aria-details'?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /** If `true`, borders are added around each accordion item. Default is `false`. */
  bordered?: boolean;
  /** The content of the accordion, required. */
  children: React.ReactNode;
  /** CSS class name for custom styling. */
  className?: string;
  /** Adds spacing around items for better separation. Default is `false`. */
  compact?: boolean;
  /** Custom icons for accordion state indicators. */
  iconOverride?: IconOverride;
  /** Specifies the accordion's style kind. */
  kind?: RothkoKind;
  /** If `true`, only one accordion item can be open at a time. Default is `false`. */
  multiple?: boolean;
  /** Inline styles for the accordion. */
  style?: React.CSSProperties;
  /** If `true`, icons are shown next to items. Default is `true`. */
  withIcon?: boolean;
  /** The list of selected panels by key */
  selectedPanelKeys?: string[];
  /** Callback when a panel is opened or closed. */
  onPanelChange?: (isOpen: boolean, panelKey: string) => void;
};

const Accordion = ({
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  bordered,
  children,
  className,
  compact,
  iconOverride,
  kind,
  multiple,
  onPanelChange,
  selectedPanelKeys = [],
  style,
  withIcon: withIcon = true,
}: AccordionProps) => {
  const [selectedPanels, setSelectedPanels] = useState(ImSet<string>(selectedPanelKeys || []));

  const onClickPanel = useCallback(
    (panelKey: string) => {
      setSelectedPanels(selected => {
        const isOpen = selected.has(panelKey);
        onPanelChange?.(!isOpen, panelKey);

        if (isOpen) return selected.remove(panelKey);
        return multiple ? selected.add(panelKey) : ImSet([panelKey]);
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
        withIcon,
      }}
    >
      <AccordionGroupDiv
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-details={ariaDetails}
        $spaced={!compact}
        style={style}
        className={className}
      >
        {children}
      </AccordionGroupDiv>
    </AccordionContext.Provider>
  );
};

const AccordionGroupDiv = styled.div<{ $spaced?: boolean }>`
  display: flex;
  flex-direction: column;

  ${({ $spaced }) =>
    $spaced &&
    css`
      gap: 0.75rem;
    `}
`;

export default Accordion;
