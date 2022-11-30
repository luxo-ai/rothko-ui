import { Set as ImSet } from 'immutable';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { idkFn } from '../Theme/theme';
import type { RothkoKind } from '../Theme/types';
import { AccordionContext } from './AccordionContext';

type AccordionProps = {
  bordered?: boolean;
  children: React.ReactNode;
  className?: string;
  kind?: RothkoKind;
  mutuallyExclusive?: boolean;
  style?: React.CSSProperties;
};

const Accordion = ({
  children,
  mutuallyExclusive,
  style,
  className,
  kind,
  bordered,
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
        selectedPanels,
        borderColor: bordered ? (kind ? idkFn(kind) : 'var(--color-border, #000)') : undefined,
        onClickPanel,
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
