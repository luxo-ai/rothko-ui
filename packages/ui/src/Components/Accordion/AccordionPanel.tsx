import { animated, useSpring } from '@react-spring/web';
import { ChevronDownOutline, ChevronUpOutline, MinusOutline, PlusOutline } from '@rothko-ui/icons';
import clsx from 'clsx';
import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';
import * as uuid from 'uuid';
import { phantomButtonStyle } from '../../Library/PhantomButton';
import { unselectableStyle } from '../../Library/Styles';
import type { Accessory } from '../../Library/types';
import type { KindProps } from '../../Theme';
import { getElementFullHeight } from '../../utils/domUtils/dimensions';
import Typography from '../Typography/Typography';
import { useAccordion } from './AccordionContext';
import type { IconKind } from './types';

const ICON_KIND_TO_ICONS: Record<IconKind, { open: Accessory; closed: Accessory }> = {
  standard: {
    open: p => <MinusOutline fill={p.color} width={p.size} height={p.size} />,
    closed: p => <PlusOutline fill={p.color} width={p.size} height={p.size} />,
  },
  chevron: {
    open: p => <ChevronUpOutline fill={p.color} width="1.5rem" height="1.5rem" />,
    closed: p => <ChevronDownOutline fill={p.color} width="1.5rem" height="1.5rem" />,
  },
};

type LabelProps = {
  className?: string;
  style?: React.CSSProperties;
};

type AccordionPanelProps = {
  children: React.ReactNode;
  className?: string;
  labelProps?: LabelProps;
  title: string | JSX.Element;
  style?: React.CSSProperties;
  initialOpen?: boolean;
};

const AccordionPanel = ({
  children,
  className,
  labelProps,
  title,
  style,
  initialOpen,
}: AccordionPanelProps) => {
  const { selectedPanels, onClickPanel, bordered, kind, iconKind } = useAccordion();
  const panelIdRef = useRef(uuid.v4());
  const isPanelSelected = selectedPanels.has(panelIdRef.current);

  const Icon = useMemo(() => {
    const { open, closed } = ICON_KIND_TO_ICONS[iconKind];
    return isPanelSelected ? open : closed;
  }, [isPanelSelected, iconKind]);

  const iconColor = kind ? `var(--rothko-${kind}-500, #000)` : 'var(--rothko-border, #000)';

  return (
    <PanelContainerDiv
      kind={kind}
      id={panelIdRef.current}
      className={clsx(className, { bordered })}
      style={style}
    >
      <header>
        <PanelLabelButton
          style={labelProps?.style}
          className={labelProps?.className}
          onClick={() => {
            onClickPanel(panelIdRef.current);
          }}
        >
          <Icon color={iconColor} size="1rem" />
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

const PanelContainerDiv = styled.div<KindProps>`
  overflow: hidden;
  background: var(--rothko-background, transparent);
  padding: 0 0.875rem;
  border-radius: 0.125rem;

  &.bordered {
    border: 1px solid
      ${({ kind }) => (kind ? `var(--rothko-${kind}-500, #000)` : 'var(--rothko-border, #000)')};
  }
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
  background: var(--rothko-background, transparent);
  padding-bottom: 0.75rem;
`;

const DefaultBodyText = styled(Typography.body)`
  margin: 0;
  padding: 0;
`;

const DefaultLabelText = styled(Typography.body).attrs({ bold: true })`
  margin: 0;
  padding: 0;
`;

export default AccordionPanel;
