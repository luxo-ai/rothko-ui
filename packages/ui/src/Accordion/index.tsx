import { MinusOutline, PlusOutline } from '@rothko-ui/icons';
import { animated, useSpring } from '@react-spring/web';
import { Set as ImSet } from 'immutable';
import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import uuid from 'uuid';
import { phantomButtonStyle } from '../Button/PhantomButton';
import { unselectableStyle } from '../Library/Styles';
import { Text } from '../Text';
import { useKindTheme } from '../Theme/ThemeContext';
import type { AemikoKind, Color, GreyScale } from '../Theme/types';
import { getElementFullHeight } from '../utils/domUtils/dimensions';

type IAccordionCtx = {
  onClickPanel: (id: string) => void;
  selectedPanels: ImSet<string>;
  borderColor?: Color;
};

const AccordionCtx = createContext<IAccordionCtx | null>(null);

const useAccordion = () => {
  const ctx = useContext(AccordionCtx);
  if (!ctx) {
    throw new Error('useAccordion called outside of context');
  }
  return ctx;
};

type AccordionProps = {
  mutuallyExclusive?: boolean;
  bordered?: boolean;
  className?: string;
  style?: React.CSSProperties;
  kind?: AemikoKind | GreyScale;
  children: React.ReactNode;
};

export const Accordion = ({
  children,
  mutuallyExclusive,
  style,
  className,
  kind = 'basic',
  bordered,
}: AccordionProps) => {
  const [themeColorer] = useKindTheme(kind);
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
    <AccordionCtx.Provider
      value={{ selectedPanels, borderColor: bordered ? themeColorer() : undefined, onClickPanel }}
    >
      <AccordionGroupDiv style={style} className={className}>
        {children}
      </AccordionGroupDiv>
    </AccordionCtx.Provider>
  );
};

type AccordionPanelProps = {
  children: React.ReactNode;
  title: string | JSX.Element;
  className?: string;
  labelProps?: LabelProps;
};

type LabelProps = {
  style?: React.CSSProperties;
  className?: string;
};

export const AccordionPanel = ({ children, title, className, labelProps }: AccordionPanelProps) => {
  const { selectedPanels, borderColor, onClickPanel } = useAccordion();
  const panelIdRef = useRef(uuid.v4());
  const isPanelSelected = selectedPanels.has(panelIdRef.current);
  const Icon = useMemo(() => (isPanelSelected ? MinusOutline : PlusOutline), [isPanelSelected]);
  return (
    <PanelContainerDiv borderColor={borderColor} id={panelIdRef.current} className={className}>
      <header>
        <PanelLabelButton
          style={labelProps?.style}
          className={labelProps?.className}
          onClick={() => onClickPanel(panelIdRef.current)}
        >
          <Icon width="1rem" height="1rem" />
          {typeof title === 'string' ? <DefaultLabelText>{title}</DefaultLabelText> : <>{title}</>}
        </PanelLabelButton>
      </header>
      <PanelContent id={`${panelIdRef.current}-content`} isOpen={isPanelSelected}>
        {typeof children === 'string' ? (
          <DefaultBodyText>{children}</DefaultBodyText>
        ) : (
          <>{children}</>
        )}
      </PanelContent>
    </PanelContainerDiv>
  );
};

type PanelContentProps = {
  id?: string;
  isOpen?: boolean;
  children: React.ReactNode;
};

const getDefaultOpenStyle = (): React.CSSProperties => ({
  height: 'initial',
  opacity: 'initial',
  overflow: 'initial',
  visibility: 'initial',
});

const getDefaultClosedStyle = (): React.CSSProperties => ({
  height: 0,
  opacity: 0,
  overflow: 'hidden',
  visibility: 'hidden',
});

const PanelContent = ({ children, id, isOpen }: PanelContentProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const style = useSpring({
    to: async next => {
      if (isOpen) {
        const contentHeight = getElementFullHeight(contentRef.current);
        await next({ overflow: 'hidden', visibility: 'initial', immediate: true });
        await next({ height: contentHeight, opacity: 1 });
        await next(getDefaultOpenStyle());
      } else {
        await next({ opacity: 1, overflow: 'hidden', immediate: true });
        await next({ height: 0, opacity: 0 });
        await next(getDefaultClosedStyle());
      }
    },
    from: isOpen ? getDefaultOpenStyle() : getDefaultClosedStyle(),
  });

  return (
    <animated.section id={id} style={style}>
      <PanelContentDiv ref={contentRef}>{children}</PanelContentDiv>
    </animated.section>
  );
};

const AccordionGroupDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const PanelContainerDiv = styled.div<{ borderColor?: Color }>`
  overflow: hidden;
  ${({ borderColor }) =>
    borderColor
      ? css`
          border: 1px solid ${borderColor};
          padding: 0 0.5rem;
          border-radius: 0.125rem;
        `
      : ''}
`;

const PanelLabelButton = styled.button`
  ${unselectableStyle}
  ${phantomButtonStyle}
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  padding: 1rem 0;
`;

const PanelContentDiv = styled.div`
  padding-bottom: 0.75rem;
`;

const DefaultBodyText = styled(Text.body)`
  margin: 0;
  padding: 0;
`;

const DefaultLabelText = styled(Text.bodyBold)`
  margin: 0;
  padding: 0;
`;
