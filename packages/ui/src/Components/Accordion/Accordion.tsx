import { Set as ImSet } from 'immutable';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import type { RothkoKind } from '../../Theme/types';
import { AccordionContext } from './AccordionContext';
import type { IconKind } from './types';

type AccordionProps = {
  bordered?: boolean;
  children: React.ReactNode;
  className?: string;
  kind?: RothkoKind;
  mutuallyExclusive?: boolean;
  style?: React.CSSProperties;
  iconKind?: IconKind;
};

const Accordion = ({
  children,
  mutuallyExclusive,
  style,
  className,
  kind,
  bordered,
  iconKind = 'standard',
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

  const registerPanel = useCallback(
    (id: string, initiallyOpen: boolean) => {
      return useEffect(() => {
        if (initiallyOpen) {
          setSelectedPanels(selected => selected.add(id));
        }
      }, [selectedPanels]);
    },
    [setSelectedPanels]
  );

  return (
    <AccordionContext.Provider
      value={{
        selectedPanels,
        kind,
        bordered,
        onClickPanel,
        iconKind,
        registerPanel,
      }}
    >
      <AccordionGroupDiv style={style} className={className}>
        {children}
      </AccordionGroupDiv>
    </AccordionContext.Provider>
  );
};

const AccordionGroupDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export default Accordion;
