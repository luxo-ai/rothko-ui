import React, { useState } from 'react';

import type { KeyLike } from '@rothko-ui/utils';
import { classes, scopedClasses } from '@rothko-ui/utils';

import type { RothkoKind } from '../../theme/types';
import type { Tab } from './types';
import { Container, Flex } from '../../layout';
import styles from './TabBar.module.scss';
import type { WithAria } from '../../types';

const sc = scopedClasses(styles);

type AriaAttributes = 'aria-label' | 'aria-controls';

type TabBarProps<Key extends KeyLike> = {
  id?: string;
  kind?: RothkoKind;
  className?: string;
  initialTab?: Key;
  onSelect?: (tab: Key) => void;
  style?: React.CSSProperties;
  tabs: ReadonlyArray<Tab<Key>>;
  containerStyle?: React.CSSProperties;
};

function TabBar<Key extends KeyLike>({
  className,
  initialTab,
  kind,
  onSelect,
  style,
  tabs,
  containerStyle = {},
  id,
  'aria-controls': ariaControls,
  'aria-label': ariaLabel,
}: WithAria<TabBarProps<Key>, AriaAttributes>) {
  const tabCount = tabs.length;
  const initialIdx = tabs.findIndex(t => t.key === initialTab);
  const [tabIdx, setTabIdx] = useState(initialIdx >= 0 ? initialIdx : 0);
  return (
    <>
      <div
        id={id}
        aria-label={ariaLabel}
        className={classes(sc('tab-list__container'), className)}
        style={style}
      >
        <Flex
          as="ul"
          className={styles['tab-list']}
          aria-label={ariaLabel}
          aria-controls={ariaControls}
          role="tablist"
        >
          {tabs.map((t, idx) => (
            <Flex
              as="li"
              role="tab"
              onClick={() => {
                setTabIdx(idx);
                onSelect?.(t.key);
              }}
              // eslint-disable-next-line react/no-array-index-key
              key={`${String(t.key)}-${idx}`}
              margin="0 auto"
              alignItems="center"
              justifyContent="center"
              columnGap="0.5rem"
              cursor="pointer"
              // aria-label={t.title}
            >
              {t.leftIcon && <div>{t.leftIcon}</div>}
              <div className={styles['tab__item']} aria-label={t.title}>
                {t.title}
              </div>
              {t.rightIcon && <div>{t.rightIcon}</div>}
            </Flex>
          ))}
        </Flex>
        <div
          style={{
            width: `${(100 / tabCount).toFixed(2)}%`,
            transform: `translateX(calc(100% * ${tabIdx}))`,
          }}
          className={sc('tab__underline', kind && `tab__underline--${kind}`)}
        />
      </div>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Container {...containerStyle}>{tabs[tabIdx].render}</Container>
    </>
  );
}

export default TabBar;
