import { SearchOutline } from '@rothko-ui/icons';
import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import { PhantomButton } from '../../../Library/PhantomButton';

type SearchButtonProps = {
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const SearchButton = ({ disabled, onClick }: SearchButtonProps) => (
  <SearchButtonBase
    className={clsx({ disabled })}
    disabled={disabled}
    onClick={onClick}
    type="submit"
  >
    <SearchOutline width="1.5rem" height="1.5rem" />
  </SearchButtonBase>
);

SearchButton.displayName = 'SearchButton';

const SearchButtonBase = styled(PhantomButton)`
  padding: 0.5rem;
  margin: 0.25rem 0.125rem 0.25rem 0;
  touch-action: manipulation;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  -webkit-font-smoothing: antialiased;
  background-image: none;
  display: inline-flex;
  align-items: center;
  height: 100%;
  width: auto;
  border-radius: 50%;
  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  :active:not(:disabled) {
    background-color: var(--color-text, #000); // black; // var(--info-transparent-500)
    & > svg {
      fill: var(--color-background, #fff);
    }
  }
`;

export default SearchButton;
