import { animated, useSpring } from '@react-spring/web';
import { MinusOutline, PlusOutline } from '@rothko-ui/icons';
import React, { useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import uuid from 'uuid';
import { phantomButtonStyle } from '../../Library/PhantomButton';
import { unselectableStyle } from '../../Library/Styles';
import { getElementFullHeight } from '../../utils/domUtils/dimensions';
import Typography from '../Typography/Typography';
import { useAccordion } from './AccordionContext';

type LabelProps = {
  className?: string;
  style?: React.CSSProperties;
};

type AccordionPanelProps = {
  children: React.ReactNode;
  className?: string;
  labelProps?: LabelProps;
  title: string | JSX.Element;
};

const AccordionPanel = ({ children, className, labelProps, title }: AccordionPanelProps) => {
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
          <Icon fill="var(--rothko-border, #000)" width="1rem" height="1rem" />
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

const PanelContainerDiv = styled.div<{ borderColor?: string }>`
  overflow: hidden;
  background: var(--rothko-background, transparent);
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
