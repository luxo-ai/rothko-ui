import { CollapseOutline, ExpandOutline } from '@aemiko/icons';
import { animated, useSpring } from '@react-spring/web';
import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { phantomButtonStyle } from '../Button/PhantomButton';
import { unselectableStyle } from '../Library/Styles';
import { Text } from '../Text';
import { getElementFullHeight } from '../utils/domUtils';

type LabelProps = {
  className?: string;
  children: string;
};

export const Label = ({ children, className }: LabelProps) => (
  <LabelContainerDiv className={className}>
    <LabelText kind="black">{children}</LabelText>
  </LabelContainerDiv>
);

type ExpandableProps = {
  className?: string;
  label: string;
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

export const ExpandableLabel = ({ label, className, children }: ExpandableProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);

  const style = useSpring({
    to: async next => {
      if (expanded) {
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
    from: expanded ? getDefaultOpenStyle() : getDefaultClosedStyle(),
  });

  const Icon = expanded ? CollapseOutline : ExpandOutline;

  return (
    <LabelContainerDiv className={className}>
      <header>
        <ExpandableLabelButton onClick={() => setExpanded(ex => !ex)}>
          <LabelText kind="black">{label}</LabelText>
          <Icon width="0.875rem" height="0.875rem" />
        </ExpandableLabelButton>
      </header>
      <animated.section style={style}>
        <ExpandableLabelContentContainerDiv ref={contentRef}>
          {typeof children === 'string' ? (
            <ExpandableLabelContentText>{children}</ExpandableLabelContentText>
          ) : (
            <>{children}</>
          )}
        </ExpandableLabelContentContainerDiv>
      </animated.section>
    </LabelContainerDiv>
  );
};

const labelStyle = css`
  background-color: white;
  padding: 0.5rem 0.75rem;
  max-width: fit-content;
  min-width: 6rem;
  border-radius: 0.125rem;
  border: 1px solid black;
`;

const ExpandableLabelButton = styled.button`
  ${phantomButtonStyle}
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const LabelContainerDiv = styled.div`
  ${labelStyle}
`;

const LabelText = styled(Text.label)`
  ${unselectableStyle}
  text-align: center;
`;

const ExpandableLabelContentContainerDiv = styled.div`
  border-top: 1px solid black;
`;

const ExpandableLabelContentText = styled(Text.bodySmall)`
  margin: 0;
`;
