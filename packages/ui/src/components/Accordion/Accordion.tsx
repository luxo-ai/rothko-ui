import { Set as ImSet } from 'immutable';
import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import type { RothkoKind } from '../../Themee/types';
import { AccordionContext } from './AccordionContext';
import type { IconOverride } from './types';

type AccordionProps = {
  bordered?: boolean;
  children: React.ReactNode;
  className?: string;
  iconOverride?: IconOverride;
  kind?: RothkoKind;
  mutuallyExclusive?: boolean;
  spaced?: boolean;
  style?: React.CSSProperties;
  withIcons?: boolean;
};

const Accordion = ({
  bordered,
  children,
  className,
  iconOverride,
  kind,
  mutuallyExclusive,
  spaced = true,
  style,
  withIcons = true,
}: AccordionProps) => {
  const [selectedPanels, setSelectedPanels] = useState(ImSet<string>());

  const onClickPanel = useCallback(
    (id: string) => {
      setSelectedPanels(selected => {
        const hasId = selected.has(id);
        if (hasId) return selected.remove(id);
        return mutuallyExclusive ? ImSet([id]) : selected.add(id);
      });
    },
    [setSelectedPanels, mutuallyExclusive]
  );

  return (
    <AccordionContext.Provider
      value={{
        bordered,
        iconOverride,
        kind,
        onClickPanel,
        selectedPanels,
        spaced,
        withIcons,
      }}
    >
      <AccordionGroupDiv $spaced={spaced} style={style} className={className}>
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
