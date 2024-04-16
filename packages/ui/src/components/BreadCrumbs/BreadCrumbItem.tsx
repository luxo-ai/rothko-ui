import React from 'react';
import styled from 'styled-components';

import Typography, { paragraphStyle } from '../Typography/Typography';
import type {
  WithAriaControls,
  WithAriaCurrent,
  WithAriaHasPopup,
  WithAriaLabel,
  WithAriaLabelledBy,
  WithAriaSelected,
} from '../../types';

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
}: BreadCrumbItemProps) => {
  if (to) {
    return (
      <BreadCrumbsItemContainerSpan
        id={id}
        role="link"
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        aria-controls={ariaControls}
        aria-selected={ariaSelected}
        aria-labelledby={ariaLabelledBy}
        aria-haspopup={ariaHasPopup}
      >
        <Typography.externalLink underline href={to} target={target}>
          {children}
        </Typography.externalLink>
      </BreadCrumbsItemContainerSpan>
    );
  }
  if (onClick) {
    return (
      <BreadCrumbsItemContainerSpan
        id={id}
        role="link"
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        aria-controls={ariaControls}
        aria-selected={ariaSelected}
        aria-labelledby={ariaLabelledBy}
        aria-haspopup={ariaHasPopup}
      >
        <Typography.linkButton underline onClick={onClick}>
          {children}
        </Typography.linkButton>
      </BreadCrumbsItemContainerSpan>
    );
  }
  return (
    <BreadCrumbsItemContainerSpan
      id={id}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      aria-controls={ariaControls}
      aria-selected={ariaSelected}
      aria-labelledby={ariaLabelledBy}
      aria-haspopup={ariaHasPopup}
    >
      <Typography.body as="span">{children}</Typography.body>
    </BreadCrumbsItemContainerSpan>
  );
};

const BreadCrumbsItemContainerSpan = styled.span`
  &:not(:last-of-type):after {
    ${paragraphStyle}
    content: ' / ';
  }
`;

export default BreadCrumbItem;
