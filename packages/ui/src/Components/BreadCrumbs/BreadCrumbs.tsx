import React from 'react';
import styled from 'styled-components';

type BreadCrumbsProps = {
  children: React.ReactNode;
};

const BreadCrumbs = ({ children }: BreadCrumbsProps) => {
  return <BreadCrumbsContainerDiv>{children}</BreadCrumbsContainerDiv>;
};

const BreadCrumbsContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`;

export default BreadCrumbs;
