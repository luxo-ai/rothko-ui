import React from 'react';
import styled from 'styled-components';
import { Text } from '../Text';

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
        <Text.externalLink className="underline" href={to} target={target}>
          {children}
        </Text.externalLink>
      </BreadCrumbsItemContainerSpan>
    );
  }
  if (onClick) {
    return (
      <BreadCrumbsItemContainerSpan>
        <Text.linkButton className="underline" onClick={onClick}>
          {children}
        </Text.linkButton>
      </BreadCrumbsItemContainerSpan>
    );
  }
  return (
    <BreadCrumbsItemContainerSpan>
      <Text.body as="span">{children}</Text.body>
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
    content: ' / ';
  }
`;
