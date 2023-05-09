import { SearchOutline } from '@rothko-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { PhantomButton } from '../../../Library/PhantomButton';

type SearchButtonProps = {
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const SearchButton = ({ disabled, onClick }: SearchButtonProps) => (
  <SearchButtonBase disabled={disabled} onClick={onClick} type="submit">
    <SearchOutline width="1.5rem" height="1.5rem" />
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
    background-color: var(--rothko-color, #000);
    & > svg {
      fill: var(--rothko-background, #fff);
    }
  }
`;

export default SearchButton;
