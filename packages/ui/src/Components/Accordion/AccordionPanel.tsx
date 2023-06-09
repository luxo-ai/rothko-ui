import { animated, useSpring } from '@react-spring/web';
import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import * as uuid from 'uuid';
import { phantomButtonStyle } from '../../Library/PhantomButton';
import { unselectableStyle } from '../../Library/Styles';
import type { KindProps } from '../../Theme';
import { getElementFullHeight } from '../../utils/domUtils/dimensions';
import Typography from '../Typography/Typography';
import { useAccordion } from './AccordionContext';
import AccordionIcon from './AccordionIcon';

type LabelProps = {
  className?: string;
  style?: React.CSSProperties;
};

type AccordionPanelProps = {
  children: React.ReactNode;
  className?: string;
  labelProps?: LabelProps;
  style?: React.CSSProperties;
  title: string | JSX.Element;
};

const AccordionPanel = ({ children, className, labelProps, style, title }: AccordionPanelProps) => {
  const { selectedPanels, onClickPanel, bordered, kind, iconOverride, spaced } = useAccordion();

  const panelIdRef = useRef(uuid.v4());
  const isPanelSelected = selectedPanels.has(panelIdRef.current);

  const iconColor = kind
    ? `var(--rothko-${kind}-500, #000)`
    : 'var(--rothko-accordion-border, #000)';

  return (
    <PanelContainerDiv
      $spaced={spaced}
      $bordered={bordered}
      kind={kind}
      id={panelIdRef.current}
      className={className}
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
          <AccordionIcon isOpen={isPanelSelected} color={iconColor} iconOverride={iconOverride} />
          {typeof title === 'string' ? (
            <DefaultLabelText kind={kind}>{title}</DefaultLabelText>
          ) : (
            <>{title}</>
          )}
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
  children: React.ReactNode;
  className?: string;
  id?: string;
  isOpen?: boolean;
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

const PanelContent = ({ children, className, id, isOpen }: PanelContentProps) => {
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
      <PanelContentDiv className={className} ref={contentRef}>
        {children}
      </PanelContentDiv>
    </animated.section>
  );
};

type PanelContainerDivProps = KindProps & {
  $bordered?: boolean;
  $spaced?: boolean;
};

const PanelContainerDiv = styled.div<PanelContainerDivProps>`
  overflow: hidden;
  background: var(--rothko-accordion-background, #fff);

  padding: 0 0.875rem;
  border-radius: 0.125rem;

  border: 1px solid var(--rothko-accordion-background, #fff);

  ${({ $bordered, kind }) =>
    $bordered &&
    css`
      background: var(--rothko-background, transparent);
      border: 1px solid ${kind ? `var(--rothko-${kind}-500, #000)` : 'var(--rothko-border, #000)'};
    `}

  ${({ $spaced }) =>
    $spaced
      ? css`
          border-radius: 0.125rem;
        `
      : css`
          border-radius: 0;
          &:last-of-type {
            border-bottom-left-radius: 0.125rem;
            border-bottom-right-radius: 0.125rem;
          }
          &:first-of-type {
            border-top-left-radius: 0.125rem;
            border-top-right-radius: 0.125rem;
          }
          &:not(:last-of-type) {
            border-bottom: none;
          }
        `}
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
  padding-bottom: 0.875rem;
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
