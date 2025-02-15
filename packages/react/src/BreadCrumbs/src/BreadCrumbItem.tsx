import { classes } from '@rothko-ui/system';
import React from 'react';

import { Link, LinkButton } from '@rothko-ui/link';
import type { WithAria } from '@rothko-ui/system';
import { Paragraph } from '@rothko-ui/typography';

type AriaAttributes =
  | 'aria-haspopup'
  | 'aria-selected'
  | 'aria-controls'
  | 'aria-labelledby'
  | 'aria-label'
  | 'aria-current';

type BreadCrumbItemProps = {
  /**
   * The `id` attribute of the breadcrumb item.
   * @type {string}
   */
  id?: string;
  /**
   * The content of the breadcrumb item.
   * @type {string}
   * @required
   */
  children: string;
  /**
   * The function to be called when the breadcrumb item is clicked.
   */
  onClick?: () => void;
  /**
   * The target of the breadcrumb item link.
   * @type {string}
   */
  target?: string;
  /**
   * The URL to navigate to when the breadcrumb item is clicked.
   * @type {string}
   */
  to?: string;
  /**
   * CSS class name(s).
   * @type {string}
   */
  className?: string;
  /**
   * The inline style for the breadcrumb item.
   * @type {React.CSSProperties}
   */
  style?: React.CSSProperties;
};

const BreadCrumbItem = ({
  id,
  'aria-controls': ariaControls,
  'aria-current': ariaCurrent,
  'aria-haspopup': ariaHasPopup,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-selected': ariaSelected,
  children,
  onClick,
  target,
  to,
  style,
  className,
}: WithAria<BreadCrumbItemProps, AriaAttributes>) => {
  const classNames = classes(
    'slash-separated',
    'rothko-color-body',
    'rothko-font-regular',
    'rothko-paragraph-size-default',
    className
  );

  if (to) {
    return (
      <span
        id={id}
        role="link"
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        aria-controls={ariaControls}
        aria-selected={ariaSelected}
        aria-labelledby={ariaLabelledBy}
        aria-haspopup={ariaHasPopup}
        style={style}
        className={classNames}
      >
        <Link underlineVariant="always" href={to} target={target}>
          {children}
        </Link>
      </span>
    );
  }
  if (onClick) {
    return (
      <span
        id={id}
        role="link"
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        aria-controls={ariaControls}
        aria-selected={ariaSelected}
        aria-labelledby={ariaLabelledBy}
        aria-haspopup={ariaHasPopup}
        style={style}
        className={classNames}
      >
        <LinkButton underlineVariant="always" onClick={onClick}>
          {children}
        </LinkButton>
      </span>
    );
  }
  return (
    <Paragraph
      as="span"
      id={id}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      aria-controls={ariaControls}
      aria-selected={ariaSelected}
      aria-labelledby={ariaLabelledBy}
      aria-haspopup={ariaHasPopup}
      style={style}
      className={classNames}
    >
      {children}
    </Paragraph>
  );
};

export default BreadCrumbItem;
