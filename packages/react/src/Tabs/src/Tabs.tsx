import type { WithAria, Dictionary, RothkoKind } from '@rothko-ui/system';
import { classes } from '@rothko-ui/system';
import React from 'react';

import type { TabProps } from './Tab';
import { useTabs } from './useTabs';

type AriaAttributes = 'aria-label' | 'aria-controls';
type StyleableComponents = 'tab' | 'tabs';

type TabsProps = {
  /**
   * The `id` attribute of the tab bar.
   * @type {string}
   */
  id?: string;
  /**
   * The tab bar's semantic style.
   * @type {RothkoKind}
   */
  kind?: RothkoKind;
  /**
   * CSS class name(s).
   * @type {string}
   */
  className?: string;
  /**
   * The initial tab to display.
   * @type {string}
   */
  initialTab?: string;
  /**
   * The callback function to be called when a tab is selected.
   */
  onSelect?: (tab: string) => void;
  /**
   * The inline style for the tabs.
   * @type {React.CSSProperties}
   */
  style?: React.CSSProperties;
  /**
   * Additional inline styles for the tabs.
   * @type {Object<StyleableComponents, React.CSSProperties>}
   */
  styles?: Dictionary<StyleableComponents, React.CSSProperties>;
  /**
   * The tabs to display.
   * @type {React.ReactElement<TabProps> | ReadonlyArray<React.ReactElement<TabProps>>}
   */
  children: React.ReactElement<TabProps> | ReadonlyArray<React.ReactElement<TabProps>>;
};

export function Tabs({
  className,
  initialTab,
  kind,
  onSelect,
  style: styleProp = {},
  id,
  children,
  styles: stylesProp,
  'aria-controls': ariaControls,
  'aria-label': ariaLabel,
}: WithAria<TabsProps, AriaAttributes>) {
  const { tab: tabStyle, tabs: tabsStyle } = stylesProp || {};

  const { tabsId, controller, activeTabElement, tabCount, tabIdx, setTabIdx } = useTabs({
    id,
    children,
    initialTab,
    tabStyle,
  });

  const tabsListClassnames = classes(
    'flex',
    'justify-between',
    'list-none',
    'bg-(--rothko-tabs-background)',
    'm-0',
    'py-2',
    'px-0',
    'md:py-1'
  );

  const tabItemClassnames = classes(
    'hide-chrome-browser-outline',
    'ios-tap-highlight-color-transparent',
    'rothko-font-regular',
    'rothko-paragraph-size-default',
    'text-(--rothko-tabs-foreground)',
    'flex',
    'items-center',
    'justify-center',
    'm-0',
    'user-select-none',
    'cursor-pointer'
  );

  const tabsVarStyle = {
    '--tabs-border': kind ? `var(--rothko-${kind})` : 'var(--rothko-tabs-border)',
  } as React.CSSProperties;

  const tabUnderlineClassnames = classes(
    'border-b-[3px]',
    'border-solid',
    'border-(--tabs-border)',
    'rounded-[50vmin]',
    'transition-transform duration-200 ease-in'
  );

  return (
    <>
      <div
        id={id}
        aria-label={ariaLabel}
        className={classes('my-2 mx-0', className)}
        style={{ ...tabsStyle, ...styleProp, ...tabsVarStyle }}
      >
        <ul className={tabsListClassnames} aria-controls={ariaControls} role="tablist">
          {controller.keys.map((tabKey, idx) => {
            const leftIcon = controller.getLeftIcon(tabKey);
            const rightIcon = controller.getRightIcon(tabKey);
            const title = controller.getTitle(tabKey);
            return (
              <li
                className="w-full my-0 mx-auto flex items-center justify-center gap-x-[0.5rem] cursor-pointer"
                role="tab"
                onClick={() => {
                  setTabIdx(idx);
                  onSelect?.(tabKey);
                }}
                key={tabKey}
                id={`${tabsId}-${tabKey}-tab`}
                aria-controls={`${tabsId}-${tabKey}--tab-content`}
              >
                {leftIcon && <div>{leftIcon}</div>}
                <div className={tabItemClassnames}>{title}</div>
                {rightIcon && <div>{rightIcon}</div>}
              </li>
            );
          })}
        </ul>
        <div
          style={{
            width: `${(100 / tabCount).toFixed(2)}%`,
            transform: `translateX(calc(100% * ${tabIdx}))`,
          }}
          className={tabUnderlineClassnames}
        />
      </div>
      <>{activeTabElement}</>
    </>
  );
}

export default Tabs;
