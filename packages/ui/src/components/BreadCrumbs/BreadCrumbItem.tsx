import React from 'react';
import styled from 'styled-components';

import Typography, { textStyle } from '../Typography/Typography';

type BreadCrumbItemProps = {
  /** The text content of the breadcrumb item. */
  children: string;
  /** Optional callback function invoked when the breadcrumb item is clicked. */
  onClick?: () => void;
  /** Optional target attribute for the breadcrumb link. */
  target?: string;
  /** Optional URL to navigate to when the breadcrumb item is clicked. */
  to?: string;
};

const BreadCrumbItem = ({ to, target, onClick, children }: BreadCrumbItemProps) => {
  if (to) {
    return (
      <BreadCrumbsItemContainerSpan>
        <Typography.externalLink className="underline" href={to} target={target}>
          {children}
        </Typography.externalLink>
      </BreadCrumbsItemContainerSpan>
    );
  }
  if (onClick) {
    return (
      <BreadCrumbsItemContainerSpan>
        <Typography.linkButton className="underline" onClick={onClick}>
          {children}
        </Typography.linkButton>
      </BreadCrumbsItemContainerSpan>
    );
  }
  return (
    <BreadCrumbsItemContainerSpan>
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
