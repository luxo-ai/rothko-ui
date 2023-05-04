import React from 'react';
import styled from 'styled-components';
import Typography, { textStyle } from '../Typography/Typography';

type BreadCrumbsProps = {
  children: React.ReactNode;
};

export const BreadCrumbs = ({ children }: BreadCrumbsProps) => {
  return <BreadCrumbsContainerDiv>{children}</BreadCrumbsContainerDiv>;
};

type BreadCrumbItemProps = {
  to?: string;
  target?: string;
  onClick?: () => void;
  children: string;
};

export const BreadCrumbItem = ({ to, target, onClick, children }: BreadCrumbItemProps) => {
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

const BreadCrumbsContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`;

const BreadCrumbsItemContainerSpan = styled.span`
  &:not(:last-of-type):after {
    ${textStyle}
    content: ' / ';
  }
`;
