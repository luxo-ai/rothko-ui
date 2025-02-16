import { first, last, useId } from '@rothko-ui/system';
import React, { Children, useMemo, useState } from 'react';

import type { TabProps } from './Tab';

class IndexedIterable<K extends string, V> implements Iterable<V> {
  private valueKeys: K[] = [];
  private valueLookup: Record<K, V> = {} as Record<K, V>;

  // O(1) / O(n)
  add(key: K, value: V): void {
    this.valueKeys.push(key);
    this.valueLookup[key] = value;
  }

  // O(n)
  remove(key: K): void {
    this.valueKeys = this.valueKeys.filter(k => k !== key);
    delete this.valueLookup[key];
  }

  // O(1)
  get(key: K): V | null {
    return this.valueLookup[key] || null;
  }

  get length(): number {
    return this.valueKeys.length;
  }

  get firstKey(): K | null {
    return first(this.valueKeys);
  }

  get lastKey(): K | null {
    return last(this.valueKeys);
  }

  get keys(): K[] {
    return this.valueKeys;
  }

  get keysClone(): K[] {
    return [...this.valueKeys];
  }

  *[Symbol.iterator](): Iterator<V> {
    for (const key of this.valueKeys) {
      yield this.valueLookup[key];
    }
  }
}

class TabController {
  private indexedTabs: IndexedIterable<string, React.ReactElement<TabProps>>;

  constructor(
    children: React.ReactElement<TabProps> | ReadonlyArray<React.ReactElement<TabProps>>
  ) {
    this.indexedTabs = new IndexedIterable();

    Children.forEach(children, child => {
      if (!React.isValidElement(child)) {
        throw new Error('Tabs only accepts Tab children');
      }
      const key = child.props.$key || '';
      this.indexedTabs.add(key, child);
    });
  }

  get tabCount() {
    return this.indexedTabs.length;
  }

  getTitle(key: string) {
    return this.indexedTabs.get(key)?.props?.title || '';
  }

  getLeftIcon(key: string) {
    return this.indexedTabs.get(key)?.props?.leftIcon || null;
  }

  getRightIcon(key: string) {
    return this.indexedTabs.get(key)?.props?.rightIcon || null;
  }

  get keys() {
    return this.indexedTabs.keys;
  }

  cloneTabElement(args: { key: string; tabsId: string; style?: React.CSSProperties }) {
    const { key, tabsId, style = {} } = args;

    const tabElement = this.indexedTabs.get(key);
    if (!tabElement) {
      return null;
    }

    const tabElementProps = tabElement.props || {};
    const tabElementStyle = tabElementProps.style || {};

    return React.cloneElement(tabElement, {
      id: `${tabsId}-${key}--tab-content`,
      'aria-labelledby': `${tabsId}-${key}-tab`,
      ...tabElementProps,
      // merge styles
      style: { ...tabElementStyle, ...style },
    });
  }
}

type HookArgs = {
  id?: string;
  initialTab?: string;
  children: React.ReactElement<TabProps> | ReadonlyArray<React.ReactElement<TabProps>>;
  tabStyle?: React.CSSProperties;
};

export const useTabs = ({ id, initialTab, children, tabStyle }: HookArgs) => {
  const tabsId = useId(id);
  const controller = useMemo(() => new TabController(children), [children]);

  const [tabIdx, setTabIdx] = useState<number>(() => {
    const initialIdx = initialTab ? controller.keys.findIndex(key => key === initialTab) : -1;
    return initialIdx >= 0 ? initialIdx : 0;
  });

  const activeTabElement = useMemo(() => {
    const currentTabKey = controller.keys[tabIdx] || '';
    return controller.cloneTabElement({ key: currentTabKey, tabsId, style: tabStyle });
  }, [tabIdx, controller, tabsId, tabStyle]);

  const tabCount = controller.tabCount;

  return {
    tabsId,
    tabCount,
    setTabIdx,
    tabIdx,
    activeTabElement,
    controller,
  };
};
