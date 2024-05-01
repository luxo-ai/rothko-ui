import React from 'react';

import type { WithAriaControls, WithAriaHidden, WithAriaLabeling } from '../../types';
import styles from './BreadCrumbs.module.scss';
import { classes } from '@rothko-ui/utils';

type WithAria<T> = WithAriaControls<WithAriaHidden<WithAriaLabeling<T>>>;

type BreadCrumbsProps = WithAria<{
  id?: string;
  /**
   * The content to be displayed as the children of the BreadCrumbs component.
   */
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}>;

const BreadCrumbs = ({
  id,
  children,
  className,
  style,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
  'aria-controls': ariaControls,
  'aria-labelledby': ariaLabelledBy,
  'aria-details': ariaDetails,
  'aria-describedby': ariaDescribedBy,
}: BreadCrumbsProps) => {
  return (
    <div
      id={id}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      aria-controls={ariaControls}
      aria-labelledby={ariaLabelledBy}
      aria-details={ariaDetails}
      aria-describedby={ariaDescribedBy}
      role="navigation"
      style={style}
      className={classes(styles['breadcrumbs'], className)}
    >
      {children}
    </div>
  );
};

export default BreadCrumbs;
