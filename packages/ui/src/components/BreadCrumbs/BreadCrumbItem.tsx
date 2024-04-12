import React from 'react';
import styled from 'styled-components';

import Typography, { textStyle } from '../Typography/Typography';
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
  /** The text content of the breadcrumb item. */
  children: string;
  /** Optional callback function invoked when the breadcrumb item is clicked. */
  onClick?: () => void;
  /** Optional target attribute for the breadcrumb link. */
  target?: string;
  /** Optional URL to navigate to when the breadcrumb item is clicked. */
  to?: string;
}>;

const BreadCrumbItem = ({
  to,
  target,
  onClick,
  children,
  'aria-label': ariaLabel,
  'aria-current': ariaCurrent,
  'aria-controls': ariaControls,
  'aria-selected': ariaSelected,
  'aria-labelledby': ariaLabelledBy,
  'aria-haspopup': ariaHasPopup,
  id,
}: BreadCrumbItemProps) => {
  if (to) {
    return (
      <BreadCrumbsItemContainerSpan
        role="link"
        id={id}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        aria-controls={ariaControls}
        aria-selected={ariaSelected}
        aria-labelledby={ariaLabelledBy}
        aria-haspopup={ariaHasPopup}
      >
        <Typography.externalLink className="underline" href={to} target={target}>
          {children}
        </Typography.externalLink>
      </BreadCrumbsItemContainerSpan>
    );
  }
  if (onClick) {
    return (
      <BreadCrumbsItemContainerSpan
        role="link"
        id={id}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        aria-controls={ariaControls}
        aria-selected={ariaSelected}
        aria-labelledby={ariaLabelledBy}
        aria-haspopup={ariaHasPopup}
      >
        <Typography.linkButton className="underline" onClick={onClick}>
          {children}
        </Typography.linkButton>
      </BreadCrumbsItemContainerSpan>
    );
  }
  return (
    <BreadCrumbsItemContainerSpan
      id={id}
      // no aria role for current item
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
    ${textStyle}
    content: ' / ';
  }
`;

export default BreadCrumbItem;
