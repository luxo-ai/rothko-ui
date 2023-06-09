import React from 'react';
import styled from 'styled-components';
import Typography, { textStyle } from '../Typography/Typography';

type BreadCrumbItemProps = {
  children: string;
  onClick?: () => void;
  target?: string;
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
