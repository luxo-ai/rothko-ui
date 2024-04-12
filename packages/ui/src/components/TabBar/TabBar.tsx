import React, { useState } from 'react';
import styled from 'styled-components';

import type { KeyLike } from '@rothko-ui/utils';

import type { RothkoKind } from '../../theme/types';
import Typography from '../Typography/Typography';
import type { Tab } from './types';
import { Container, Flex, FlexItem } from '../../layout';
import type { WithAriaLabeling } from '../../types';

type WithAria<T> = WithAriaLabeling<T>;

type TabBarProps<Key extends KeyLike> = WithAria<{
  id?: string;
  kind?: RothkoKind;
  className?: string;
  initialTab?: Key;
  onSelect?: (tab: Key) => void;
  style?: React.CSSProperties;
  tabs: ReadonlyArray<Tab<Key>>;
  containerStyle?: React.CSSProperties;
}>;

function TabBar<Key extends KeyLike>({
  className,
  initialTab,
  kind,
  onSelect,
  style,
  tabs,
  containerStyle = {},
  id,
}: TabBarProps<Key>) {
  const tabCount = tabs.length;
  const initialIdx = tabs.findIndex(t => t.key === initialTab);
  const [tabIdx, setTabIdx] = useState(initialIdx >= 0 ? initialIdx : 0);
  return (
    <>
      <TabListContainerDiv id={id} className={className} style={style}>
        <TabList aria-label="tablist" role="tablist" tabCount={tabCount}>
          {tabs.map((t, idx) => (
            <Flex
              as="li"
              role="tab"
              onClick={() => {
                setTabIdx(idx);
                onSelect?.(t.key);
              }}
              // style={{ '-webkit-tap-highlight-color': 'transparent' }}
              key={`${String(t.key)}-${idx}`}
              margin="0 auto"
              alignItems="center"
              columnGap="0.5rem"
              cursor="pointer"
              // aria-label={t.title}
            >
              <FlexItem>{t.leftIcon}</FlexItem>
              <TabItem aria-label={t.title}>{t.title}</TabItem>
              <FlexItem>{t.rightIcon}</FlexItem>
            </Flex>
          ))}
        </TabList>
        <UnderLineDiv kind={kind} tabCount={tabCount} currentTabIdx={tabIdx} />
      </TabListContainerDiv>
      <Container {...containerStyle}>{tabs[tabIdx].render}</Container>
    </>
  );
}

type UnderlineDivProps = {
  kind?: RothkoKind;
  currentTabIdx: number;
  tabCount: number;
};

const TabListContainerDiv = styled.div`
  margin: 0.5rem 0;
`;

const TabList = styled.ul<{ tabCount: number }>`
  display: grid;
  grid-template-columns: repeat(${({ tabCount }) => tabCount}, 1fr);

  list-style: none;

  margin: 0;
  // padding betweeb list and underline
  padding: 0.5rem 0;
  // tablet and mobile
  @media only screen and (max-width: 700px) {
    padding: 0.25rem 0;
  }

  & > li {
    -webkit-tap-highlight-color: transparent;
  }
`;

const TabItem = styled(Typography.body)`
  // .attrs({ as: 'li' })
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0;
  user-select: none;

  cursor: pointer;
`;

const UnderLineDiv = styled.div<UnderlineDivProps>`
  width: ${({ tabCount }) => `${(100 / tabCount).toFixed(2)}%`};
  border-bottom: 3px solid
    ${({ kind }) =>
      kind ? `var(--rothko-${kind}-500, #000)` : 'var(--rothko-tabBar-border, #000)'};
  border-radius: 50vmin;

  -webkit-transform: translateX(calc(100% * ${({ currentTabIdx }) => currentTabIdx}));
  -moz-transform: translateX(calc(100% * ${({ currentTabIdx }) => currentTabIdx}));
  transform: translateX(calc(100% * ${({ currentTabIdx }) => currentTabIdx}));

  -webkit-transition: transform 0.2s ease-in;
  -moz-transition: transform 0.2s ease-in;
  transition: transform 0.2s ease-in;
`;

export default TabBar;
