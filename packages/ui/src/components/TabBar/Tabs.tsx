/* eslint-disable no-console */
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import type { KindProps } from '../../theme/types';
import Typography from '../Typography/Typography';

type HookArgs<Key> = {
  initialTab?: Key;
  onSelect?: (tabKey: Key) => void;
  children: React.ReactElement | React.ReactElement[];
};

export class Okz<K extends React.Key> {
  private readonly keys: K[];
  private readonly lookup: Record<K, Ok<K>>;

  private constructor(vals: Ok<K>[]) {
    this.lookup = vals.reduce((acc, v) => ({ ...acc, [v.key]: v }), {} as Record<K, Ok<K>>);
    this.keys = vals.map(v => v.key);
    Object.freeze(this);
  }

  static from<K extends React.Key>(vals: Ok<K>[]) {
    return new Okz(vals);
  }

  get length() {
    return this.keys.length;
  }

  get first() {
    return this.lookup[this.keys[0]];
  }

  getByKey(key: K) {
    return this.lookup[key] ?? null;
  }

  *map<T>(fn: (ok: Ok<K>) => T) {
    for (const key of this.keys) {
      yield fn(this.lookup[key]);
    }
  }

  *[Symbol.iterator]() {
    for (const key of this.keys) {
      yield this.lookup[key];
    }
  }
}

type Ok<Key extends React.Key> = {
  key: Key;
  title: string;
  index: number;
  children: string | React.ReactElement;
};

const useTabs = <Key extends React.Key>({ initialTab, onSelect, children }: HookArgs<Key>) => {
  const tabz = useMemo(() => {
    const oksz = React.Children.toArray(children).map((child, idx) => {
      if (!React.isValidElement(child)) {
        throw new Error('Tab children must be valid React elements');
      }

      const title = child.props?.title;
      const children = child.props?.children || null;
      const key = child.key;

      if (!key || !title || !children) {
        throw new Error('Tab children must have a key, title, and children');
      }

      if (typeof title !== 'string') {
        throw new Error('Tab title must be a string');
      }

      if (typeof children !== 'string' && !React.isValidElement(children)) {
        throw new Error('Tab title must be a string or a valid React element');
      }

      return {
        key,
        title,
        children,
        index: idx,
      };
    });

    return Okz.from(oksz);
  }, [children]);

  const [activeTabKey, setActiveTabKey] = useState(initialTab || tabz.first.key);

  const onSelectTab = useCallback(
    (tabKey: Key) => {
      setActiveTabKey(tabKey);
      onSelect?.(tabKey);
    },
    [onSelect, setActiveTabKey]
  );

  console.log('activeTabKey', activeTabKey);

  return {
    activeTab: tabz.getByKey(activeTabKey),
    onSelectTab,
    tabCount: tabz.length,
    tabz,
  };
};

type TabsProps<Key extends React.Key> = KindProps & {
  className?: string;
  initialTab?: Key;
  onSelect?: (tab: Key) => void; // Key
  style?: React.CSSProperties;
  children: React.ReactElement | React.ReactElement[];
};

function Tabs<Key extends React.Key>({
  className,
  initialTab,
  kind,
  onSelect,
  style,
  children,
}: TabsProps<Key>) {
  const { activeTab, onSelectTab, tabz, tabCount } = useTabs({ initialTab, onSelect, children });
  console.log('activeTab', activeTab);
  console.log('tabz', tabz);
  console.log('tabCount', tabCount);
  return (
    <>
      <TabListContainerDiv className={className} style={style}>
        <TabList aria-label="tablist" role="tablist" tabCount={tabCount}>
          {[...tabz].map(t => (
            <TabItem
              aria-label={t.title}
              key="dik"
              // key={`${t.key}uhu`}
              role="tab"
              onClick={() => onSelectTab(t.key as Key)}
            >
              {t.title}
            </TabItem>
          ))}
        </TabList>
        <UnderLineDiv kind={kind} tabCount={tabCount} currentTabIdx={activeTab?.index || 0} />
      </TabListContainerDiv>
      <>{activeTab?.children}</>
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
  padding: 0.5rem 0;
  // tablet and mobile
  @media only screen and (max-width: 700px) {
    padding: 0.25rem 0;
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

export default Tabs;
