import React from 'react';

import { classes } from '@rothko-ui/utils';

import styles from './BreadCrumbs.module.scss';
import type { WithAria } from '../../types';

type AriaAttributes =
  | 'aria-label'
  | 'aria-hidden'
  | 'aria-controls'
  | 'aria-labelledby'
  | 'aria-details'
  | 'aria-describedby';

type BreadCrumbsProps = {
  id?: string;
  /**
   * The content to be displayed as the children of the BreadCrumbs component.
   */
  children: React.ReactNode;
  /**
   * The class name for the BreadCrumbs component.
   */
  className?: string;
  /**
   * The style for the BreadCrumbs component.
   */
  style?: React.CSSProperties;
};

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
}: WithAria<BreadCrumbsProps, AriaAttributes>) => {
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
