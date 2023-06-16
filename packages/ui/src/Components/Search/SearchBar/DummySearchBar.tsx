import type { Nullable } from 'utils';
import React from 'react';
import styled from 'styled-components';
import { ItemText } from '../../../Library/Common';
import { PhantomButton } from '../../../Library/PhantomButton';
import { PhantomInput } from '../../../Library/PhantomInput';
import SearchButton from './SearchButton';
import styles from './styles';

type DummySearchBarProps = {
  activeText?: Nullable<string>;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit: () => void;
  placeholder?: string;
};

const DummySearchBar = ({
  activeText,
  className,
  disabled,
  onClick,
  onSubmit,
  placeholder,
}: DummySearchBarProps) => (
  <PlaceholderWrapperDiv className={className}>
    {/* for accessibility purposes */}
    <PhantomInput type="text" tabIndex={-1} readOnly visibility="hidden" position="absolute" />
    <DummySearchTextButton disabled={disabled} type="button" onClick={onClick}>
      {(activeText || placeholder) && (
        <ItemText light placeHolder={!activeText}>
          {activeText || placeholder}
        </ItemText>
      )}
    </DummySearchTextButton>
    <SearchButton disabled={disabled || !activeText} onClick={() => onSubmit()} type="button" />
  </PlaceholderWrapperDiv>
);

const PlaceholderWrapperDiv = styled.div`
  ${styles.searchBarWrapperStyle}
`;

const DummySearchTextButton = styled(PhantomButton)`
  display: flex;
  ${styles.searchBarInputStyle}
`;

export default DummySearchBar;
