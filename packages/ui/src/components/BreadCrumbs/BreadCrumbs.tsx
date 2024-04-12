import React from 'react';
import styled from 'styled-components';
import type { WithAriaControls, WithAriaHidden, WithAriaLabeling } from '../../types';

type WithAria<T> = WithAriaControls<WithAriaHidden<WithAriaLabeling<T>>>;

type BreadCrumbsProps = WithAria<{
  id?: string;
  children: React.ReactNode;
}>;

const BreadCrumbs = ({
  id,
  children,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
  'aria-controls': ariaControls,
  'aria-labelledby': ariaLabelledBy,
  'aria-details': ariaDetails,
  'aria-describedby': ariaDescribedBy,
}: BreadCrumbsProps) => {
  return (
    <BreadCrumbsContainerDiv
      id={id}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      aria-controls={ariaControls}
      aria-labelledby={ariaLabelledBy}
      aria-details={ariaDetails}
      aria-describedby={ariaDescribedBy}
      role="navigation"
    >
      {children}
    </BreadCrumbsContainerDiv>
  );
};

const BreadCrumbsContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`;

export default BreadCrumbs;
