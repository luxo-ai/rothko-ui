import React, { useState } from 'react';
import styled from 'styled-components';
import { textStyle } from '../Text/Text';
import { useTheme } from '../Theme';
import { ThemedElement } from '../Theme/types';
import { NonEmptyArray } from '../types';

type KeyLike = string | number | symbol;
type RenderTab = () => JSX.Element;

export type Tab<Key extends KeyLike> = {
  title: string;
  key: Key;
  render: RenderTab;
};

export type TabBarProps<Key extends KeyLike> = Pick<
  React.HTMLProps<HTMLDivElement>,
  'className' | 'style'
> & {
  tabs: NonEmptyArray<Tab<Key>>;
  initialTab?: Key;
  onSelect?: (tab: Key) => void;
};

export function TabBar<Key extends KeyLike>({
  tabs,
  initialTab,
  onSelect,
  className,
  style,
}: TabBarProps<Key>) {
  const initialIdx = tabs.findIndex(t => t.key === initialTab);
  const { theme } = useTheme();
  const [tabIdx, setTabIdx] = useState(initialIdx >= 0 ? initialIdx : 0);
  const TabComponent: RenderTab = tabs[tabIdx].render;
  return (
    <>
      <div className={className} style={style}>
        <TabList role="tablist">
          {tabs.map((t, idx) => (
            <TabItem
              role="tab"
              key={String(t.key)}
              onClick={() => {
                setTabIdx(idx);
                onSelect?.(t.key);
              }}
            >
              {t.title}
            </TabItem>
          ))}
        </TabList>
        <UnderLine aemikoTheme={theme} tabCount={tabs.length} currentTabIdx={tabIdx} />
      </div>
      <TabComponent />
    </>
  );
}

type UnderlineProps = ThemedElement & {
  tabCount: number;
  currentTabIdx: number;
};

const UnderLine = styled.div<UnderlineProps>`
  width: ${({ tabCount }) => `${100 / tabCount}%`};
  border-bottom: 3px solid ${({ aemikoTheme }) => aemikoTheme['secondary-500']};
  border-radius: 50vmin;

  -webkit-transform: translateX(calc(100% * ${({ currentTabIdx }) => currentTabIdx}));
  -moz-transform: translateX(calc(100% * ${({ currentTabIdx }) => currentTabIdx}));
  transform: translateX(calc(100% * ${({ currentTabIdx }) => currentTabIdx}));

  -webkit-transition: transform 0.2s ease-in;
  -moz-transition: transform 0.2s ease-in;
  transition: transform 0.2s ease-in;
`;

const TabList = styled.ul`
  padding: 1rem 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const TabItem = styled.li`
  ${textStyle}
  padding: 0 3rem;
  cursor: pointer;
`;
