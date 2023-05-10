import type { KeyLike } from '@rothko-ui/utils';
import React, { useState } from 'react';
import styled from 'styled-components';
import type { KindProps } from '../../Theme/types';
import Typography from '../Typography/Typography';
import type { RenderTab, Tab } from './types';

type TabBarProps<Key extends KeyLike> = KindProps & {
  className?: string;
  initialTab?: Key;
  onSelect?: (tab: Key) => void;
  style?: React.CSSProperties;
  tabs: ReadonlyArray<Tab<Key>>;
};

function TabBar<Key extends KeyLike>({
  className,
  initialTab,
  kind,
  onSelect,
  style,
  tabs,
}: TabBarProps<Key>) {
  const tabCount = tabs.length;
  const initialIdx = tabs.findIndex(t => t.key === initialTab);
  const [tabIdx, setTabIdx] = useState(initialIdx >= 0 ? initialIdx : 0);
  const TabComponent: RenderTab = tabs[tabIdx].render;
  return (
    <>
      <TabListContainerDiv className={className} style={style}>
        <TabList aria-label="tablist" role="tablist" tabCount={tabCount}>
          {tabs.map((t, idx) => (
            <TabItem
              aria-label={t.title}
              key={`${String(t.key)}-${idx}`}
              role="tab"
              onClick={() => {
                setTabIdx(idx);
                onSelect?.(t.key);
              }}
            >
              {t.title}
            </TabItem>
          ))}
        </TabList>
        <UnderLineDiv kind={kind} tabCount={tabCount} currentTabIdx={tabIdx} />
      </TabListContainerDiv>
      <TabComponent />
    </>
  );
}

type UnderlineDivProps = KindProps & {
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
  padding: 1rem 0;
  // tablet and mobile
  @media only screen and (max-width: 700px) {
    padding: 0.5rem 0;
  }
`;

const TabItem = styled(Typography.body).attrs({ as: 'li' })`
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const UnderLineDiv = styled.div<UnderlineDivProps>`
  width: ${({ tabCount }) => `${(100 / tabCount).toFixed(2)}%`};
  border-bottom: 3px solid
    ${({ kind }) => (kind ? `var(--rothko-${kind}-500, #000)` : 'var(--rothko-tabBar-border, #000')};
  border-radius: 50vmin;

  -webkit-transform: translateX(calc(100% * ${({ currentTabIdx }) => currentTabIdx}));
  -moz-transform: translateX(calc(100% * ${({ currentTabIdx }) => currentTabIdx}));
  transform: translateX(calc(100% * ${({ currentTabIdx }) => currentTabIdx}));

  -webkit-transition: transform 0.2s ease-in;
  -moz-transition: transform 0.2s ease-in;
  transition: transform 0.2s ease-in;
`;

export default TabBar;
