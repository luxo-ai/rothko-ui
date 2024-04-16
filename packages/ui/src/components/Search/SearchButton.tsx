import { SearchOutline } from '@rothko-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { PhantomButton } from '../../library/PhantomButton';
import { vuar } from '../../library/utils/vuar';

type SearchButtonProps = {
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit';
};

const SearchButton = ({ disabled, onClick, type = 'submit' }: SearchButtonProps) => (
  <SearchButtonBase aria-label="Search" disabled={disabled} onClick={onClick} type={type}>
    <SearchOutline aria-hidden width="1.5rem" height="1.5rem" />
  </SearchButtonBase>
);

const SearchButtonBase = styled(PhantomButton)`
  display: inline-flex;
  align-items: center;
  height: 100%;
  width: auto;

  padding: 0.5rem;
  margin: 0.25rem 0.25rem 0.25rem 0;

  border-radius: 50%;

  :active:not(:disabled) {
    // switch
    background-color: ${vuar({ category: 'foreground' })};
    & > svg {
      fill: ${vuar({ category: 'background' })};
    }
  }
`;

export default SearchButton;
