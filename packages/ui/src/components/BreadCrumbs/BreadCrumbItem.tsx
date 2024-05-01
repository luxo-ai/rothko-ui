import React from 'react';

import Typography from '../Typography/Typography';
import type {
  WithAriaControls,
  WithAriaCurrent,
  WithAriaHasPopup,
  WithAriaLabel,
  WithAriaLabelledBy,
  WithAriaSelected,
} from '../../types';
import { Link, LinkButton } from '../Link';
import styles from './BreadCrumbItem.module.scss';
import { classes } from '@rothko-ui/utils';

type WithAria<T> = WithAriaHasPopup<
  WithAriaLabelledBy<WithAriaSelected<WithAriaControls<WithAriaLabel<WithAriaCurrent<T>>>>>
>;

type BreadCrumbItemProps = WithAria<{
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
  className?: string;
  style?: React.CSSProperties;
}>;

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
}: BreadCrumbItemProps) => {
  const classNames = classes(styles['breadcrumbs-item'], className);

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
