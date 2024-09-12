import React from 'react';

import { classes } from '@rothko-ui/utils';

import Typography from '../Typography/Typography';
import { Link, LinkButton } from '../Link';
import styles from './BreadCrumbs.module.scss';
import type { WithAria } from '../../types';

type AriaAttributes =
  | 'aria-haspopup'
  | 'aria-selected'
  | 'aria-controls'
  | 'aria-labelledby'
  | 'aria-label'
  | 'aria-current';

type BreadCrumbItemProps = {
  id?: string;
  /**
   * The content of the breadcrumb item.
   */
  children: string;
  /**
   * The function to be called when the breadcrumb item is clicked.
   */
  onClick?: () => void;
  /**
   * The target of the breadcrumb item link.
   */
  target?: string;
  /**
   * The URL to navigate to when the breadcrumb item is clicked.
   */
  to?: string;
  /**
   * The class name for the breadcrumb item.
   */
  className?: string;
  /**
   * The style for the breadcrumb item.
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
  const classNames = classes(styles['breadcrumbs__item'], className);

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
        <Link underline="always" href={to} target={target}>
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
        <LinkButton underline="always" onClick={onClick}>
          {children}
        </LinkButton>
      </span>
    );
  }
  return (
    <span
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
      <Typography.body as="span">{children}</Typography.body>
    </span>
  );
};

export default BreadCrumbItem;
