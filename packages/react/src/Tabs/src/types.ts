import type { Dictionary, RothkoKind } from '@rothko-ui/system';
import type React from 'react';

type AriaAttributes = 'aria-label' | 'aria-controls';
type StyleableComponents = 'tab' | 'tabs';

type TabProps = {
  id?: string;
  'aria-labelledby'?: string;
  $key: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
  title: string;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
};

export type TabsProps = {
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
   * The inline style for the tab bar.
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
   * @type {ReadonlyArray<React.ReactElement<TabProps>>}
   */
  children: ReadonlyArray<React.ReactElement<TabProps>>;
};
