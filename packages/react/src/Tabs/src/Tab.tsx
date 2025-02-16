import React from 'react';

export type TabProps = {
  /**
   * The `id` attribute of the tab.
   * @type {string}
   */
  id?: string;
  /**
   * The key of the tab.
   * @type {string}
   * @required
   */
  $key: string;
  /**
   * The inline style for the tab.
   * @type {React.CSSProperties}
   */
  style?: React.CSSProperties;
  /**
   * The content of the tab.
   * @type {React.ReactNode}
   */
  children?: React.ReactNode;
  /**
   * CSS class name(s).
   * @type {string}
   */
  className?: string;
  /**
   * The `aria-labelledby` attribute of the tab.
   * @type {string}
   */
  'aria-labelledby'?: string;
};

export function Tab({
  id,
  'aria-labelledby': ariaLabelledBy,
  $key,
  style,
  className,
  children,
}: TabProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      key={String($key)}
      style={style}
      className={className}
    >
      {children}
    </section>
  );
}
